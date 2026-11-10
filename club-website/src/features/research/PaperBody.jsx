import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// Imported here so the KaTeX styles load only with this route's chunk
import 'katex/dist/katex.min.css'

export default function PaperBody({ markdown }) {
  return (
    <div className="paper-body mt-10">
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
