import { useEffect, useState } from 'react';

export function useUserAgent() {
  const [userAgent, setUserAgent] = useState<string>();
  useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, [setUserAgent]);
  return userAgent;
}
