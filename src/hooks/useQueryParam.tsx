import { useEffect, useState } from 'react';

export function useQueryParam(key: string) {
  const [queryParam, setQueryParam] = useState<string>();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQueryParam(params.get(key) ?? '');
  }, [setQueryParam]);
  return queryParam;
}
