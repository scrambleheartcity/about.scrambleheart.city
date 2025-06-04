import { EffectCallback, useEffect } from 'react';

export function useMount(cb: EffectCallback) {
  useEffect(() => cb(), []);
}
