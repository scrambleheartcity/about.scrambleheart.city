import { RefObject, useCallback, useEffect, useState } from 'react';

type WindowApi<T> = {
  send: (data: T) => void;
};
export function useOtherWindow<Incoming, Outgoing>(
  iframeRef: RefObject<HTMLIFrameElement> | null,
  handler: (data: Incoming) => void,
): WindowApi<Outgoing> {
  // setup api once using refs
  const [api] = useState<WindowApi<Outgoing>>({
    send: (data: Outgoing) => {
      const iframe = iframeRef?.current?.contentWindow;
      const parent = window.self !== window.top ? window.parent : null;
      const otherWindow = iframe ?? parent;
      otherWindow?.postMessage(data);
    },
  });

  // handler that can be adjusted
  const onMessage = useCallback(
    (evt: MessageEvent<Incoming>) => handler(evt.data),
    [handler],
  );
  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [onMessage]);

  return api;
}
