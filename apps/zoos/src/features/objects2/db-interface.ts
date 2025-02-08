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

// Objects enhanced by joining on `objects_history` and `objects_folders`
// tables (see `getObjects`)
type ObjectSelectJoin = ObjectView & {
  objects_history:
    | Pick<ObjectHistorySelect, "tag" | "update_email" | "updated_at">[]
    | null;
  objects_folders?: { path: string } | null;
};

// Users
// TODO use types from `objects.types.ts`
type User = {
  email: string;
  user_type: string;
  group_ids: number[];
};

// ! Main `Object` type within application
type Object = Omit<ObjectSelectJoin, "created_at" | "last_updated_at"> & {
  created_at: Date;
  last_updated_at: Date;
};

export type {
  ObjectsSchema,
  User,
  ObjectTypes,
  Object,
  ObjectSelect,
  ObjectSelectJoin,
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

const dumpObjectUpdate = (object: Object): ObjectUpdate => ({
  ...object,
  created_at: object.created_at.toISOString(),
  last_updated_at: object.last_updated_at.toISOString(),
});

const dumpObjectInsert = (object: Object): ObjectInsert => ({
  ...object,
  created_at: object.created_at.toISOString(),
  last_updated_at: object.last_updated_at.toISOString(),
});

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

const addObject = ({ object }: { object: Object }) =>
  getObjectsClient()
    .from("objects")
    .insert(dumpObjectInsert(object))
    .select("*");

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

export { moveObject, deleteObject, addObject, updateObject };

// --------------- supabase-write

/*
 start: supabase-read
 --------------------
 */

const parseObject = (object: ObjectSelectJoin): Object => ({
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

export { keyFactory, getObjectsQuery };

// -------------- queries

/*
start: mutations
----------------
*/

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

export { moveObjectMutation };

// -------------- mutations
