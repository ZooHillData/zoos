import type { TreeNode } from "@zoos/navigation";
import type { Database } from "../../lib/supabase";

import { getClient, getQueryKey } from "../../lib/supabase";

import { createQueryOptions, createMutationOptions } from "@zoos/react-query";

/*
start: objects-client
---------------------

Get the objects client (connected to the objects schema already)
*/

// Which Postgres schema did you put the objects tables?
// ! Make sure to expose this schema in Supabase API
// either in Admin UI or config.tomml `api.schema`
// [supabase docs](https://supabase.com/docs/guides/local-development/cli/config#api.schemas)
const OBJECTS_SCHEMA = "zoos" as const;
const getObjectsClient = () => getClient().schema(OBJECTS_SCHEMA);

export { OBJECTS_SCHEMA, getObjectsClient };

// --------------- objects-client

/*
start: types
 ------------
 */

type ObjectsSchema = typeof OBJECTS_SCHEMA;

// Object types in database
type ObjectTypes = "data";

// Objects table
type ObjectSelect = Database[ObjectsSchema]["Tables"]["objects"]["Row"];
type ObjectInsert = Database[ObjectsSchema]["Tables"]["objects"]["Insert"];
type ObjectUpdate = Database[ObjectsSchema]["Tables"]["objects"]["Update"];

// Objects history table
type ObjectHistorySelect =
  Database[ObjectsSchema]["Tables"]["objects_history"]["Row"];
type ObjectHistoryInsert =
  Database[ObjectsSchema]["Tables"]["objects_history"]["Insert"];
type ObjectHistoryUpdate =
  Database[ObjectsSchema]["Tables"]["objects_history"]["Update"];

// Objects folder table
type ObjectFolderSelect =
  Database[ObjectsSchema]["Tables"]["objects_folders"]["Row"];
type ObjectFolderInsert =
  Database[ObjectsSchema]["Tables"]["objects_folders"]["Insert"];
type ObjectFolderUpdate =
  Database[ObjectsSchema]["Tables"]["objects_folders"]["Update"];

// From objects view that joins objects to folders
type ObjectView = Database[ObjectsSchema]["Views"]["objects_view"]["Row"];
type ObjectViewJoin = ObjectView & {
  objects_history:
    | Pick<ObjectHistorySelect, "tag" | "update_email" | "updated_at">[]
    | null;
};

// Users
// TODO use types from `objects.types.ts`
type User = {
  email: string;
  user_type: string;
  group_ids: number[];
};

// ! Main `Object` type within application
type Object = Omit<ObjectViewJoin, "created_at" | "last_updated_at"> & {
  created_at: Date;
  last_updated_at: Date;
};

type ObjectsTableData = TreeNode<Object>;

export type {
  ObjectsTableData,
  ObjectsSchema,
  User,
  ObjectTypes,
  Object,
  ObjectSelect,
  ObjectInsert,
  ObjectUpdate,
  ObjectHistorySelect,
  ObjectHistoryInsert,
  ObjectHistoryUpdate,
  ObjectFolderSelect,
  ObjectFolderInsert,
  ObjectFolderUpdate,
};

// --------------- types

/*
start: supabase-write
---------------------

e.g. move, delete, add
*/

const dumpObjectUpdate = (object: Object): ObjectUpdate => {
  const { objects_history, folder_path, folder_owner_email, ...rest } = object;
  return {
    ...rest,
    created_at: object.created_at.toISOString(),
    last_updated_at: object.last_updated_at.toISOString(),
  };
};

const moveObject = ({
  objectId,
  folderId,
}: {
  objectId: number;
  folderId: number;
}) =>
  getObjectsClient()
    .from("objects")
    .update({ folder_id: folderId })
    .match({ id: objectId });

const deleteObject = async ({ objectId }: { objectId: number }) =>
  getObjectsClient().from("objects").delete().match({ id: objectId });

const addObject = ({ object }: { object: ObjectInsert }) =>
  getObjectsClient().from("objects").insert(object).select("*");

const addObjectFolder = ({ folder }: { folder: ObjectFolderInsert }) =>
  getObjectsClient().from("objects_folders").insert(folder).select("*");

const updateObject = ({
  objectId,
  object,
}: {
  objectId: number;
  object: Object;
}) =>
  getObjectsClient()
    .from("objects")
    .update(dumpObjectUpdate(object))
    .match({ id: objectId })
    .select("*");

export { moveObject, deleteObject, addObject, updateObject, addObjectFolder };

// --------------- supabase-write

/*
 start: supabase-read
 --------------------
 */

const parseObject = (object: ObjectViewJoin): Object => ({
  ...object,
  created_at: new Date(object.created_at),
  last_updated_at: new Date(object.last_updated_at),
});

const getObjects = () =>
  getObjectsClient().from("objects_view").select(`
    *,
    objects_history(update_email, tag, updated_at)
    `);

const getFolders = () => getObjectsClient().from("objects_folders").select("*");
const getFolder = ({ id }: { id: number }) =>
  getObjectsClient().from("objects_folders").select("*").match({ id });

const getUsers = () => getObjectsClient().from("objects_users").select("*");

const getObjectHistory = ({ id }: { id: number }) =>
  getObjectsClient()
    .from("objects_history")
    .select("*")
    .match({ object_id: id });

export { parseObject, getObjects, getFolders, getUsers, getObjectHistory };

// ---------------- supabase-read

/*
start: queries
--------------
*/

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

const getObjectsQuery = createQueryOptions({
  queryKey: keyFactory.objects.all,
  queryFn: async () => {
    const { data } = await getObjects();
    return data?.map(parseObject);
  },
});

const getFoldersQuery = createQueryOptions({
  queryKey: keyFactory.folders.all,
  queryFn: async () => {
    const { data } = await getFolders();
    return data;
  },
});

const getFolderQuery = createQueryOptions({
  queryKey: keyFactory.folders.all,
  queryFn: async ({ id }: { id: number }) => {
    const { data } = await getFolder({ id });
    return data;
  },
});

const getUsersQuery = createQueryOptions({
  queryKey: keyFactory.users.all,
  queryFn: async () => {
    const { data } = await getUsers();
    return data;
  },
});

export {
  keyFactory,
  getFolderQuery,
  getObjectsQuery,
  getFoldersQuery,
  getUsersQuery,
};

// -------------- queries

/*
start: mutations 
----------------
*/

// table: objects

const moveObjectMutation = createMutationOptions({
  mutationKey: getQueryKey(["move-object"]),
  mutationFn: async (params: Parameters<typeof moveObject>[0]) =>
    await moveObject(params),
  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: keyFactory.objects.all });
    },
  },
});

const deleteObjectMutation = createMutationOptions({
  mutationKey: getQueryKey(["delete-object"]),
  mutationFn: async (params: Parameters<typeof deleteObject>[0]) =>
    await deleteObject(params),
  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: keyFactory.objects.all });
    },
  },
});

const addObjectMutation = createMutationOptions({
  mutationKey: getQueryKey(["add-object"]),
  mutationFn: async (params: Parameters<typeof addObject>[0]) =>
    await addObject(params),
  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: keyFactory.objects.all });
    },
  },
});

const updateObjectMutation = createMutationOptions({
  mutationKey: getQueryKey(["update-object"]),
  mutationFn: async (params: Parameters<typeof updateObject>[0]) =>
    await updateObject(params),
  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: keyFactory.objects.all });
    },
  },
});

// table: objects_folders

const addObjectFolderMutation = createMutationOptions({
  mutationKey: getQueryKey(["add-object-folder"]),
  mutationFn: async (params: Parameters<typeof addObjectFolder>[0]) =>
    await addObjectFolder(params),
  options: {
    onSuccess: ({ queryClient }) => {
      queryClient.invalidateQueries({ queryKey: keyFactory.folders.all });
    },
  },
});

export {
  moveObjectMutation,
  deleteObjectMutation,
  addObjectMutation,
  updateObjectMutation,
  addObjectFolderMutation,
};

// -------------- mutations
