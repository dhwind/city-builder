type UseReactQueryMutationProps<TRequestBody, TResponse> = {
  mutationFn: (data: TRequestBody) => Promise<TResponse>;
  queryKeys: string[] | string;
};

export type { UseReactQueryMutationProps };
