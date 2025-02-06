import type {
  ObjectSelect,
  ObjectHistorySelect,
  ObjectFolderSelect,
} from "./types";

import { createQueryOptions } from "@zoos/react-query";

import { getQueryKey, getClient } from "../../lib/supabase";
import { parseObject } from "./db/parse-objects";

// Query key factory: https://tkdodo.eu/blog/effective-react-query-keys
const keyFactory = {
  objects: {
    all: getQueryKey(["objects"]),
    history: () => [...keyFactory.objects.all, "history"],
  },
  folders: {
    all: getQueryKey(["folders"]),
    paths: () => [...keyFactory.folders.all, "paths"],
  },
  users: {
    all: getQueryKey(["users"]),
    emails: () => [...keyFactory.users.all, "emails"],
  },
};

const getObjects = createQueryOptions({
  queryKey: keyFactory.objects.all,
  queryFn: async () => {
    const { data } = await getClient().schema("zoos").from("objects").select(`
      *,
      objects_folders(path),
      objects_history(
          updated_at,
          update_email,
          tag
      )
      `);
    return data?.map(parseObject);
  },
});

const getUsersEmails = createQueryOptions({
  queryKey: keyFactory.users.emails(),
  queryFn: async () => {
    const { data } = await getClient()
      .schema("zoos")
      .from("objects_users")
      .select("*");
    return data?.map((user) => user.email) || [];
  },
});

const getFolderPaths = createQueryOptions({
  queryKey: keyFactory.folders.paths(),
  queryFn: async () => {
    const { data } = await getClient()
      .schema("zoos")
      .from("objects_folders")
      .select("*");

    return data?.map((folder) => folder.path);
  },
});

const getFolders = createQueryOptions({
  queryKey: keyFactory.folders.all,
  queryFn: async () => {
    const { data } = await getClient()
      .schema("zoos")
      .from("objects_folders")
      .select("*");
    return data;
  },
});

const getObjectHistory = createQueryOptions({
  queryKey: keyFactory.objects.history(),
  queryFn: async (params: { id: number }) => {
    const { data } = await getClient()
      .schema("zoos")
      .from("objects_history")
      .select("updated_at,update_email")
      .eq("id", params.id)
      .order("updated_at", { ascending: false });
    return data;
  },
});

export {
  getObjects,
  getFolders,
  getFolderPaths,
  getUsersEmails,
  keyFactory,
  getObjectHistory,
};
