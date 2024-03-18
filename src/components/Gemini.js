import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import MarkdownToHtml from './Markdown';

const MODEL_NAME = "gemini-1.0-pro";

const Gemini = ({ input, short, onSummary }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const geminiRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !dataFetched) {
        fetchData();
      }
    });

    if (geminiRef.current) {
      observer.observe(geminiRef.current);
    }

    return () => {
      if (geminiRef.current) {
        observer.unobserve(geminiRef.current);
      }
    };
  }, [dataFetched]);

  const fetchData = async () => {
    if (!input) return; // Handle empty input
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE},
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
      ];

  const parts = [
    {text: "You are a news reporter summarizing the news articles in 5 points or less and keep neutral tone. Keep the pointers simple yet informative. Use markdown circle bullets for response."},
    {text: "input: https://www.reuters.com/world/europe/russias-presidential-election-2024-live-candidates-polls-when-results-will-be-2024-03-17/?utm_campaign=fullarticle&utm_medium=referral&utm_source=inshorts\n\nVladimir Putin has won Russia's Presidential election, extending his rule until 2030. Putin was named acting president in December 1999 by then-president Boris Yeltsin and has been in office as President or Prime Minister ever since. Following constitutional changes in 2020, Putin would be able to run again and potentially stay in power until 2036."},
    {text: "output: - Vladimir Putin has won Russia's Presidential election, extending his rule until 2030.\n- Putin has been in office as President or Prime Minister since 1999.\n- Constitutional changes in 2020 allow Putin to run again and potentially stay in power until 2036.\n- Putin's victory comes amid ongoing international condemnation of Russia's invasion of Ukraine.\n- The election was widely criticized by opposition groups and international observers as undemocratic and lacking genuine competition."},
    {text: "input: " + input + " " + short},
    {text: "output: "},
  ];
      const result = await model.generateContent({ contents: [{ role: "user", parts }], generationConfig, safetySettings });
      const response = result.response;
      setSummary(response.text());
      
      // If onSummary prop is provided, call it with the generated summary
      if (onSummary) {
        onSummary(response.text());
      }
      setDataFetched(true);
    } catch (error) {
      console.error('Error generating summary:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='text-sm rounded-md p-2 mb-4 h-32 text-left  overflow-y-scroll overflow-x-hidden ' ref={geminiRef}>
      {loading ? (
  <div class="animate-pulse flex space-x-4">
  <div class="flex-1 space-y-3 py-1">
    <div class="h-2 bg-slate-700 rounded"></div>
    <div class="space-y-3">
      <div class="grid grid-cols-3 gap-4">
        <div class="h-2 bg-slate-700 rounded col-span-2"></div>
        <div class="h-2 bg-slate-700 rounded col-span-1"></div>
      </div>
      <div class="h-2 bg-slate-700 rounded"></div>
      <div class="grid grid-cols-4 gap-4">
        <div class="h-2 bg-slate-700 rounded col-span-1"></div>
        <div class="h-2 bg-slate-700 rounded col-span-2"></div>
        <div class="h-2 bg-slate-700 rounded col-span-1"></div>
      </div>
    </div>
 
</div>
</div>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : summary ? (
        <div>
<MarkdownToHtml content={summary} />

</div>      
      ) : null}
    </div>
  );
};

export default Gemini;
