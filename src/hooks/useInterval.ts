import { useCallback, useState } from 'react';

export function useTimer() {
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout | undefined>();

  const clear = useCallback(() => {
    clearTimeout(timeoutRef);
    clearInterval(timeoutRef);
    setTimeoutRef(undefined);
  }, [timeoutRef]);

  const startTimeout = useCallback(
    (cb: () => void, ms: number) => {
      clear();
      setTimeoutRef(
        setTimeout(() => {
          cb();
          clear();
        }, ms),
      );
    },
    [clear, setTimeoutRef],
  );

  const startInterval = useCallback(
    (cb: () => void, ms: number) => {
      clear();
      setTimeoutRef(setInterval(cb, ms));
    },
    [clear, setTimeoutRef],
  );

  return {
    timeoutRef,
    startInterval,
    startTimeout,
    clear,
  };
}
