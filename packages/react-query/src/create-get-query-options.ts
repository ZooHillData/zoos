import { type UseQueryOptions, type QueryKey } from "@tanstack/react-query";

type OptionalQueryOptions<TData, TParams> = Omit<
  UseQueryOptions<TData, TParams>,
  "queryKey" | "queryFn"
>;

// type GetQueryOptions<TData, TParams> = TParams extends void
//   ? (options?: {
//       // Add params here so that params can always be accessed
//       params?: undefined;
//       options?: OptionalQueryOptions<TData, TParams>;
//     }) => UseQueryOptions<TData, TParams>
//   : (options: {
//       params: TParams;
//       options?: OptionalQueryOptions<TData, TParams>;
//     }) => UseQueryOptions<TData, TParams>;

type GetQueryOptions<TData, TParams> = (options: {
  params: TParams;
  options?: OptionalQueryOptions<TData, TParams>;
}) => UseQueryOptions<TData, TParams>;

type GetQueryOptionsParams<TData, TParams> = TParams extends void
  ?
      | {
          options?: OptionalQueryOptions<TData, TParams>;
        }
      | undefined
  : {
      params: TParams;
      options?: OptionalQueryOptions<TData, TParams>;
    };

const createGetQueryOptions = <TData, TParams>({
  queryFn,
  queryKey,
  options: optionsFromCreate,
}: {
  // queryFn: TParams extends void
  //   ? // Conditional typing if TParams is void
  //     () => Promise<TData>
  //   : // Conditional typing if TParams is not void
  //     (params: TParams) => Promise<TData>;
  queryFn: (params: TParams) => Promise<TData>;
  queryKey: QueryKey;
  options?: OptionalQueryOptions<TData, TParams>;
}): GetQueryOptions<TData, TParams> => {
  return (options: Parameters<GetQueryOptions<TData, TParams>>[0]) => {
    // Extract params and options from getOptionsParams passed
    // during use
    //
    // This is a little ugly, but was the best I could come up with
    // to get all the typing to line up.
    //
    // If you think you can change, that would be awesome, though bewarned...
    const { options: optionsFromUse } = options ?? {};
    const params = options && "params" in options ? options.params : undefined;

    return {
      queryKey: params ? [...queryKey, params] : queryKey,
      queryFn: params ? () => queryFn(params) : queryFn,
      ...optionsFromCreate,
      ...optionsFromUse,
    } as UseQueryOptions<TData, TParams>;
  };
};

type CreateGetQueryOptions<TData, TParams> = typeof createGetQueryOptions<
  TData,
  TParams
>;

export {
  createGetQueryOptions,
  type GetQueryOptions,
  type CreateGetQueryOptions,
};
