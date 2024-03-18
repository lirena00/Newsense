import Scroller from "@/components/Scroller";
import Navbar from "@/components/Navbar";
import Head from "next/head";


export default function Topic(articles) {
    return (
        <>
    <Head>
      <title>Newsense | Topic</title>
      <meta name="description" content="Newsense is a news aggregator that provides you with the latest news from various sources without any nuisance and use Gemini to summarize the news." />
      <meta property="og:title" content="Newsense - Avoid Nuisance" />
      <meta property="og:description" content="Newsense is a news aggregator that provides you with the latest news from various sources without any nuisance and use Gemini to summarize the news." />
      <meta property="og:image" content="/newsense.jpg" />
      <meta property="og:url" content="https://newsense.lirena.xyz/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Newsense - Avoid Nuisance" />
      <meta name="twitter:description" content="Newsense is a news aggregator that provides you with the latest news from various sources without any nuisance and use Gemini to summarize the news" />
      <meta name="twitter:image" content="/newsense.jpg" />
      <meta name="twitter:url" content="https://newsense.lirena.xyz/" />
      <link rel="icon" href="/favicon.ico" />
      
    </Head>
        <main
        className={`  flex max-h-screen flex-col items-center justify-between text-text`}
      >
  <Navbar />
  <Scroller articles={articles} />     
      </main>
      </>
    );
  }
  
export async function getServerSideProps(context){
    const {slug} = context.params
    console.log(slug)
    const url = `https://newsense-api.vercel.app/news?category=${slug}`
    const res = await fetch(url);
    const articles = await res.json();

    return {
        props: {
            articles:articles
        }
    }
}