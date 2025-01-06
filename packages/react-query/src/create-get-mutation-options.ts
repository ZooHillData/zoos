import {
  type UseMutationOptions,
  type QueryKey,
  type QueryClient,
} from "@tanstack/react-query";

type TContext = {
  queryClient: QueryClient;
};

type UseMutationOptionsDefaulted<TData, TVariables> = Omit<
  UseMutationOptions<TData, Error, TVariables, TContext>,
  "mutationKey" | "mutationFn" | "onMutate" | "onSuccess"
> & {
  onSuccess?: (params: {
    data: TData;
    variables: TVariables;
    queryClient: QueryClient;
  }) => void;
  onError?: (params: {
    error: Error;
    variables: TVariables;
    queryClient?: QueryClient;
  }) => void;
};

type GetMutationOptions<TData, TVariables> = (options: {
  options?: UseMutationOptionsDefaulted<TData, TVariables>;
  queryClient: QueryClient;
}) => UseMutationOptions<TData, Error, TVariables, TContext>;

const createGetMutationOptions = <TData, TVariables>({
  mutationKey,
  mutationFn,
  options: {
    onSuccess: onSuccessCreate,
    onError: onErrorCreate,
    ...optionsCreate
  } = {},
}: {
  mutationKey: QueryKey;
  mutationFn: (variables: TVariables) => Promise<TData>;
  options?: UseMutationOptionsDefaulted<TData, TVariables>;
}): GetMutationOptions<TData, TVariables> => {
  return ({
    options: {
      onSuccess: onSuccessUse,
      onError: onErrorUse,
      ...optionsUse
    } = {},
    queryClient,
  }: {
    options?: UseMutationOptionsDefaulted<TData, TVariables>;
    queryClient: QueryClient;
  }) => ({
    mutationKey,
    mutationFn: mutationFn,
    onMutate: () => ({ queryClient }),
    onSuccess: (data, variables, context) => {
      onSuccessCreate?.({ data, variables, queryClient: context.queryClient });
      onSuccessUse?.({ data, variables, queryClient: context.queryClient });
    },
    onError: (error, variables, context) => {
      onErrorCreate?.({ error, variables, queryClient: context?.queryClient });
      onErrorUse?.({ error, variables, queryClient: context?.queryClient });
    },
    ...optionsCreate,
    ...optionsUse,
  });
};

type CreateGetMutationOptionsFn<TData, TVariables> =
  typeof createGetMutationOptions<TData, TVariables>;

export {
  createGetMutationOptions,
  type GetMutationOptions,
  type CreateGetMutationOptionsFn,
};
