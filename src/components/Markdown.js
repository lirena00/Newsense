// components/MarkdownRenderer.js

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

export default function Markdown({ content }) {
  const htmlContent = unified()
    .use(remarkParse)
    .use(remarkHtml)
    .processSync(content)
    .toString();

  return <div className='summary-content' dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
