import type { Object, ObjectSelectJoin } from "../types";
/** Parse an object from database into internal format */
const parseObject = (object: ObjectSelectJoin): Object => ({
  ...object,
  created_at: new Date(object.created_at),
  last_updated_at: new Date(object.last_updated_at),
});

/** Get the info fields only */
const getInfoFields = (object: Object) => {
  const {
    object_data,
    access_read_emails,
    access_write_emails,
    access_manage_emails,
    access_read_group_ids,
    access_write_group_ids,
    access_manage_group_ids,
    ...rest
  } = object;

  return rest;
};

const getEditableInfoFields = (object: Object) => {
  const {
    id,
    object_type,
    owner_email,
    created_at,
    last_updated_at,
    last_updated_email,
    ...editableInfoFields
  } = getInfoFields(object);

  return editableInfoFields;
};

const getAutomaticInfoFields = (object: Object) => {
  const {
    id,
    object_type,
    owner_email,
    created_at,
    last_updated_at,
    last_updated_email,
  } = object;

  return {
    id,
    object_type,
    owner_email,
    created_at,
    last_updated_at,
    last_updated_email,
  };
};

export {
  parseObject,
  getInfoFields,
  getEditableInfoFields,
  getAutomaticInfoFields,
};
