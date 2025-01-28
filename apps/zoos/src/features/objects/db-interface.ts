type ObjectType = "data";

// This is how the Object is stored in the database
type ObjectInDb = {
  id: number;
  folder_id?: number;
  name: string;
  description?: string;
  object_type: ObjectType;
  object_data: Record<string, unknown>;
  metadata: Record<string, unknown>;
  owner_email: string;
  created_at: string;
  last_updated_at: string;
  last_updated_email: string;
  access_read_emails: string[];
  access_write_emails: string[];
  access_manage_emails: string[];
  access_read_group_ids: number[];
  access_write_group_ids: number[];
  access_manage_group_ids: number[];
};

// This is the Object type we will work with internally
type Object = Omit<ObjectInDb, "created_at" | "last_updated_at"> & {
  created_at: Date;
  last_updated_at: Date;
};

type User = {
  email: string;
  user_type: string;
  group_ids: number[];
};

const parseObject = (object: ObjectInDb): Object => ({
  ...object,
  created_at: new Date(object.created_at),
  last_updated_at: new Date(object.last_updated_at),
});

export type { ObjectType, Object, ObjectInDb, User };
export { parseObject };
