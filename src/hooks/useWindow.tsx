import { useState } from 'react';
import { useMount } from './useMount';

export function useWindow() {
  const [myWindow, setMyWindow] = useState<Window | undefined>();
  useMount(() => {
    setMyWindow(window);
  });
  return myWindow;
}
