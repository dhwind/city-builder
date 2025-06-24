'use client';

import { debounce } from 'lodash';
import { useLayoutEffect, useMemo, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => debounce((...args: any[]) => callbackRef.current(...args), delay),
    [delay],
  );
};

export { useDebounce };
