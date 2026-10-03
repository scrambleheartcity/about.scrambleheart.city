import { useEffect } from 'react';

export function useKeyDown(
  targetKeyCode: string | string[],
  callback: () => void,
) {
  useEffect(() => {
    const keys = new Set(
      Array.isArray(targetKeyCode) ? targetKeyCode : [targetKeyCode],
    );
    const handleKeyDown = (event: KeyboardEvent) => {
      if (keys.has(event.code)) {
        callback();
      }
    };

    // Bind the event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [targetKeyCode, callback]); // Re-run if target key or callback changes
}
