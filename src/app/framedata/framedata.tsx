'use client';

import { useFetch } from '@/hooks/useFetch';
import 'github-markdown-css';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './framedata.module.css';

export function FrameData() {
  // todo fetch direct from source
  // need to fix CORS issues
  const data = useFetch('/assets/data/framedata.md', 'text');
  const toRender = data ?? '# Loading...';
  return (
    <div className="markdown-body">
      <div className={styles.body}>
        <Markdown remarkPlugins={[remarkGfm]}>{toRender}</Markdown>;
      </div>
    </div>
  );
}
