import { useEffect } from 'react';

export function useKeyDown(targetKey: string, callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback();
      }
    };

    // Bind the event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [targetKey, callback]); // Re-run if target key or callback changes
}
