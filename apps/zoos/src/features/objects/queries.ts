import { createQueryOptions } from "@zoos/react-query";

import { getQueryKey, getClient } from "../../lib/supabase";
import { parseObject } from "./db-interface";

// Query key factory: https://tkdodo.eu/blog/effective-react-query-keys
const keyFactory = {
  objects: {
    all: getQueryKey(["objects"]),
  },
  users: {
    all: getQueryKey(["users"]),
    emails: getQueryKey(["users", "emails"]),
  },
};

const getObjects = createQueryOptions({
  queryKey: keyFactory.objects.all,
  queryFn: async () => {
    const { data } = await getClient()
      .schema("zoos")
      .from("objects")
      .select("*");
    return data?.map(parseObject);
  },
});

const getUsersEmails = createQueryOptions({
  queryKey: keyFactory.users.emails,
  queryFn: async () => {
    const { data } = await getClient()
      .schema("zoos")
      .from("objects_users")
      .select("*");
    return data?.map((user) => user.email) || [];
  },
});

export { getObjects, getUsersEmails, keyFactory };
