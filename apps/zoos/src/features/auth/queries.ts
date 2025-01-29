import { useQuery } from "@tanstack/react-query";
import { createQueryOptions } from "@zoos/react-query";
import { getClient, getQueryKey } from "../../lib/supabase";

const getUser = createQueryOptions({
  queryKey: getQueryKey(["user"]),
  queryFn: async () => {
    const { data } = await getClient().auth.getUser();
    return data.user;
  },
});

const useUserQuery = () => useQuery(getUser({ params: {} }));

export { getUser, useUserQuery };
