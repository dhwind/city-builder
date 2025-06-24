import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { UseReactQueryMutationProps } from './types';

const useReactQueryMutation = <TRequestBody, TResponse>({
  queryKeys,
  mutationFn,
}: UseReactQueryMutationProps<TRequestBody, TResponse>) => {
  const client = useQueryClient();

  return useMutation<TResponse, Error, TRequestBody>({
    mutationFn,
    onSettled: () =>
      client.invalidateQueries(queryKeys as InvalidateQueryFilters),
  });
};

export { useReactQueryMutation };

export type { UseReactQueryMutationProps };
