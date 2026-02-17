import { useEffect, useState } from 'react';

export function useQueryParam(key: string, defaultValue = '') {
  const [queryParam, setQueryParam] = useState<string>(defaultValue);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQueryParam(params.get(key) ?? defaultValue);
  }, [setQueryParam]);
  return queryParam;
}
