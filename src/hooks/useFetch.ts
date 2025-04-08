import { useEffect, useState } from 'react';

export function useFetch(src: string, type: 'text' | 'json') {
  const [data, setData] = useState<string | undefined>();

  useEffect(() => {
    async function performFetch() {
      const resp = await fetch(src);
      const data = await {
        ['text']: () => resp.text(),
        ['json']: () => resp.json(),
      }[type]();
      setData(data);
    }
    performFetch();
  }, [src, type, setData]);

  return data;
}
