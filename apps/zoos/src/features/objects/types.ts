// From supabase `supabase gen types` command
// npx supabase gen types --lang=typescript \ --project-id $PROJECT_ID --schema zoos > ~/Downloads/database.types.ts
import type { Database } from "../../lib/supabase";
import type { TreeNode } from "@zoos/navigation";

const OBJECTS_SCHEMA = "zoos";
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

type ObjectView = Database[ObjectsSchema]["Views"]["objects_view"]["Row"];
type ObjectViewJoined = ObjectView & {
  objects_history: ObjectHistorySelect[];
};

// Users
// TODO use types from `objects.types.ts`
type User = {
  email: string;
  user_type: string;
  group_ids: number[];
};

// Objects (in application) result of `parseObject`
type Object = Omit<ObjectViewJoined, "created_at" | "last_updated_at"> & {
  created_at: Date;
  last_updated_at: Date;
};

export type {
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
