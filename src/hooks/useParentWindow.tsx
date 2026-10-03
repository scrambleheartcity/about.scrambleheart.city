import { useCallback, useEffect } from 'react';

export function useParentWindow<T>(onMessage: (data: MessageEvent<T>) => void) {
  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [onMessage]);

  const sendMessage = useCallback(
    (data: T) => window.parent.postMessage(data),
    [],
  );

  // todo if not iframed, return null
  return { send: sendMessage };
}
