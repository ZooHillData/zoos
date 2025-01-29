import type { ObjectInsert } from "../types";

const DEFAULT_OBJECT: Omit<ObjectInsert, "owner_email" | "last_updated_email"> =
  {
    // Description
    name: "",
    description: "",
    // Object type / data
    object_type: "data",
    object_data: {},
    // Metadata

    // Permissions
    access_read_emails: [] as string[],
    access_write_emails: [] as string[],
    access_manage_emails: [] as string[],
    access_read_group_ids: [] as number[],
    access_write_group_ids: [] as number[],
    access_manage_group_ids: [] as number[],
  };

export { DEFAULT_OBJECT };
