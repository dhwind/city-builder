'use client';

import { UseMutationResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useMutationStatus = <
  TData,
  TError = Error,
  TVariables = unknown,
  TContext = unknown,
>(
  mutation: UseMutationResult<TData, TError, TVariables, TContext>,
) => {
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (mutation.isPending) {
      setIsPending(true);
    } else {
      setIsPending(false);
    }
  }, [mutation.isPending]);

  return isPending;
};

export { useMutationStatus };
