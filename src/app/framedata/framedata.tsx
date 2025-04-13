import 'github-markdown-css';

import Markdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import styles from './framedata.module.css';

export type FrameDataProps = {
  data: string;
};

export function FrameData(props: FrameDataProps) {
  return (
    <div className="markdown-body">
      <div className={styles.body}>
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
          {props.data}
        </Markdown>
      </div>
    </div>
  );
}
