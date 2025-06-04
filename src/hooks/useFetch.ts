import { useEffect, useState } from 'react';

export function useFetch(src: string) {
  const [data, setData] = useState<string | undefined>();

  useEffect(() => {
    async function performFetch() {
      const resp = await fetch(src);
      const data = await resp.text();
      setData(data);
    }
    performFetch();
  }, [src, setData]);

  return data;
}
