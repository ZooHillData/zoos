import { createQueryOptions } from "@zoos/react-query";
import { getClient, getQueryKey } from "../supabase";

const getUser = createQueryOptions({
  queryKey: getQueryKey(["user"]),
  queryFn: async () => {
    const { data } = await getClient().auth.getUser();
    return data.user;
  },
});

export { getUser };
