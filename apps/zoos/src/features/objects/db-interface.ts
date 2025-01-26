type ObjectType = "data";

// This is how the Object is stored in the database
type ObjectInDb = {
  id: string;
  name: string;
  description?: string;
  owner_email: string;
  object_type: string;
  access_read: string[];
  access_write: string[];
  access_manage: string[];
  object_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  update_email: string;
};

// This is the Object type we will work with internally
type Object = Omit<ObjectInDb, "created_at" | "updated_at"> & {
  created_at: Date;
  updated_at: Date;
};

const parseObject = (object: ObjectInDb): Object => ({
  ...object,
  created_at: new Date(object.created_at),
  updated_at: new Date(object.updated_at),
});

export type { ObjectType, Object, ObjectInDb };
export { parseObject };
