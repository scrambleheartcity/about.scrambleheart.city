import { useRef } from 'react';

export function useTimer() {
  const timeoutRef = useRef<NodeJS.Timeout>();
  function clear() {
    clearTimeout(timeoutRef.current);
    clearInterval(timeoutRef.current);
    timeoutRef.current = undefined;
  }
  function startTimeout(cb: () => void, ms: number) {
    clear();
    timeoutRef.current = setTimeout(() => {
      cb();
      clear();
    }, ms);
  }
  function startInterval(cb: () => void, ms: number) {
    clear();
    timeoutRef.current = setInterval(cb, ms);
  }
  return {
    timeoutRef,
    startInterval,
    startTimeout,
    clear,
  };
}
