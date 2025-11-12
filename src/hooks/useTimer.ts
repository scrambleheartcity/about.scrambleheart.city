import { MutableRefObject, useRef, useState } from 'react';

type TimeoutRef = MutableRefObject<NodeJS.Timeout | undefined>;
function createCallbacks(timeoutRef: TimeoutRef) {
  function clear() {
    clearTimeout(timeoutRef.current);
    clearInterval(timeoutRef.current);
    timeoutRef.current = undefined;
  }

  function startInterval(cb: () => void, ms: number, runOnce?: boolean) {
    clear();
    timeoutRef.current = setInterval(cb, ms);
    if (runOnce) cb();
  }

  function startTimeout(cb: () => void, ms: number) {
    clear();
    timeoutRef.current = setTimeout(() => {
      cb();
      clear();
    }, ms);
  }

  return { timeoutRef, clear, startInterval, startTimeout };
}

export function useTimer() {
  const timeoutRef: TimeoutRef = useRef();
  const [callbacks] = useState(createCallbacks(timeoutRef));
  return callbacks;
}
