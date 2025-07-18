import 'github-markdown-css';

import Markdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export function MarkdownPage(props: { markdown: string }) {
  return (
    <div className="markdown-body" style={{ minHeight: '100vh' }}>
      <div style={{ padding: '1em 2em' }}>
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
          {props.markdown}
        </Markdown>
      </div>
    </div>
  );
}
