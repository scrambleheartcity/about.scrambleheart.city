import { useState } from 'react';
import { useMount } from './useMount';

export function useClientValue<T>(staticVal: T, dynamicVal: T) {
  const [val, setVal] = useState<T>(staticVal);
  useMount(() => setVal(dynamicVal));
  return val;
}
