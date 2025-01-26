import { createQueryOptions } from "@zoos/react-query";

import { getQueryKey, getClient } from "../../lib/supabase";
import { parseObject } from "./db-interface";

const getObjects = createQueryOptions({
  queryKey: getQueryKey(["objects"]),
  queryFn: async () => {
    const { data } = await getClient()
      .schema("zoos")
      .from("objects")
      .select("*");
    return data?.map(parseObject);
  },
});

export { getObjects };
