import type { FormConfig } from "@zoos/react-form";
import { moveObjectMutation, Object } from "./db-interface";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toKebabCase } from "remeda";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Label,
  buttonVariants,
} from "@zoos/shadcn";
import { getFormConfig, Form } from "@zoos/react-form";

import { useQueryClient } from "../../lib/use-query-client";
import { queries } from "../auth";

import { PermissionsForm as PermissionsFormBase } from "./permissions-form";
import {
  addObjectFolderMutation,
  deleteObjectMutation,
  getFoldersQuery,
  getUsersQuery,
  updateObjectMutation,
  ObjectFolderSelect,
  addObjectMutation,
} from "./db-interface";

/**
 *
 * @param id - an id of any type (e.g. camel case, snake case, etc.)
 * @returns the id converted to title case (e.g. "camelCase" -> "Camel Case")
 */
const idToTitleCase = (id: string) =>
  toKebabCase(id)
    .split("-")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");

/**
 *
 * @returns Shared layout used by all auth form configs below
 * (some may override this layout)
 */
const getSharedLayout = <Form extends object, Context = unknown>(): FormConfig<
  Form,
  Context
>["layout"] => ({
  rowContainerProps: { className: "py-2" },
  fieldContainerProps: { className: "space-y-1" },
  formContainerProps: { className: "space-y-4" },
  labelComponent:
    () =>
    ({ name }) => <Label>{idToTitleCase(name)}</Label>,
});

/*
start: folder
*/

// Form data defaults and context
const folderDefaultValues = {
  path: "",
  description: "",
};
type FolderFormContext = { folders: ObjectFolderSelect[] };

// Form config
const folderFormConfig = getFormConfig({
  defaultValues: folderDefaultValues,
  context: {} as FolderFormContext,
})({
  formOptions: {},
  fields: [
    { name: "path", type: "string" },
    { name: "description", type: "string" },
  ],
  layout: {
    ...getSharedLayout(),
  },
});

// Form component (fetches data for context)
const FolderForm = (props: {
  object?: Object;
  mutationOptions?: Parameters<typeof addObjectFolderMutation>[0]["options"];
}) => {
  const queryClient = useQueryClient();
  const { data: user } = queries.useUserQuery();
  const { data: folders } = useQuery(getFoldersQuery({ params: {} }));
  const { mutateAsync: addFolder } = useMutation(
    addObjectFolderMutation({ queryClient, options: props.mutationOptions }),
  );

  return (
    <Form
      config={{ ...folderFormConfig }}
      context={{ folders: folders || [] }}
      onSubmit={async ({ value }) => {
        // If no user, cannot do the mutation
        if (!user?.email) return;

        await addFolder({
          folder: {
            ...value,
            owner_email: user.email,
            last_updated_email: user.email,
          },
        });
      }}
    />
  );
};

export { folderFormConfig, FolderForm };

// ---------- end: folder

/*
start: raw-object

Edit the raw JSON data representing the object
*/

const rawObjectDefaultValues = {
  object_data: "{}",
};

const rawObjectFormConfig = (value?: typeof rawObjectDefaultValues) =>
  getFormConfig({
    defaultValues: value || rawObjectDefaultValues,
    context: {},
  })({
    formOptions: {},
    fields: [{ name: "object_data", type: "string" }],
    layout: {
      ...getSharedLayout(),
    },
  });

const RawObjectForm = (props: {
  object: Object;
  mutationOptions?: Parameters<typeof updateObjectMutation>[0]["options"];
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateObject } = useMutation(
    updateObjectMutation({ queryClient, options: props.mutationOptions }),
  );

  return (
    <Form
      config={rawObjectFormConfig({
        object_data: JSON.stringify(props.object.object_data),
      })}
      context={{}}
      onSubmit={async ({ value }) => {
        if (props.object) {
          await updateObject({
            objectId: props.object.id,
            object: {
              ...props.object,
              object_data: JSON.parse(value.object_data),
            },
          });
        }
      }}
    />
  );
};

export { rawObjectFormConfig, RawObjectForm };

// ---------------- end: open-raw

/*
start: edit-permissions
*/

const PermissionsForm = (props: {
  object: Object;
  mutationOptions?: Parameters<typeof updateObjectMutation>[0]["options"];
}) => {
  const queryClient = useQueryClient();
  const { data: users } = useQuery(getUsersQuery({ params: {} }));
  const { mutateAsync: updateObject } = useMutation(
    updateObjectMutation({ queryClient, options: props.mutationOptions }),
  );

  return (
    <PermissionsFormBase
      options={users?.map((user) => user.email) || []}
      permissions={{
        read: props.object.access_read_emails,
        write: props.object.access_write_emails,
        manage: props.object.access_manage_emails,
      }}
      onSubmit={async (permissions) => {
        await updateObject({
          objectId: props.object.id,
          object: {
            ...props.object,
            access_read_emails: permissions.read,
            access_write_emails: permissions.write,
            access_manage_emails: permissions.manage,
          },
        });
      }}
    />
  );
};

export { PermissionsForm };

// ---------------- end: edit-permissions

/*
start: delete-object
*/

const DeleteObjectDialog = (props: {
  object: Object;
  mutationOptions?: Parameters<typeof deleteObjectMutation>[0]["options"];
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteObject } = useMutation(
    deleteObjectMutation({ options: props.mutationOptions, queryClient }),
  );

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete?</AlertDialogTitle>
        <AlertDialogDescription>
          {`Are you sure you to delete '${props.object.name}'?`}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          className={buttonVariants({ variant: "destructive" })}
          onClick={() => deleteObject({ objectId: props.object.id })}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export { DeleteObjectDialog };

/*
start: add-object
*/

const addObjectDefaultValues = {
  name: "",
  description: "",
  object_data: "{}",
};
const addObjectFormConfig = getFormConfig({
  defaultValues: addObjectDefaultValues,
  context: {},
})({
  formOptions: {},
  fields: [
    { name: "name", type: "string" },
    { name: "description", type: "string.long" },
    { name: "object_data", type: "string.long" },
  ],
  layout: {
    ...getSharedLayout(),
  },
});
const AddObjectForm = (props: {
  mutationOptions?: Parameters<typeof addObjectMutation>[0]["options"];
}) => {
  const queryClient = useQueryClient();
  const { data: user } = queries.useUserQuery();
  const { mutateAsync: addObject } = useMutation(
    addObjectMutation({ queryClient, options: props.mutationOptions }),
  );

  return (
    <Form
      config={addObjectFormConfig}
      context={{}}
      onSubmit={async ({ value }) => {
        if (!user?.email) return;

        await addObject({
          object: {
            ...value,
            object_type: "data",
            owner_email: user.email,
            last_updated_email: user.email,
          },
        });
      }}
    />
  );
};

export { AddObjectForm };

// ---------------- end: add-object

/*
start: move-object
*/

const moveObjectDefaultValues = {
  folderPath: "",
};
type MoveObjectFormContext = { folders: ObjectFolderSelect[] };
const moveObjectFormConfig = getFormConfig({
  defaultValues: moveObjectDefaultValues,
  context: {} as MoveObjectFormContext,
})({
  formOptions: {},
  fields: [
    {
      name: "folderPath",
      type: "array-string.single",
      options: ({ context }) => context.folders.map((folder) => folder.path),
    },
  ],
  layout: {
    ...getSharedLayout(),
  },
});
const MoveObjectForm = (props: {
  object: Object;
  mutationOptions?: Parameters<typeof moveObjectMutation>[0]["options"];
}) => {
  const queryClient = useQueryClient();
  const { data: user } = queries.useUserQuery();
  const { data: folders } = useQuery(getFoldersQuery({ params: {} }));
  const { mutateAsync: moveObject } = useMutation(
    moveObjectMutation({ queryClient, options: props.mutationOptions }),
  );

  return (
    <Form
      config={moveObjectFormConfig}
      context={{ folders: folders || [] }}
      onSubmit={async ({ value }) => {
        if (!user?.email) return;
        const folderId = folders?.find(
          (folder) => folder.path === value.folderPath,
        )?.id;
        if (!folderId) return;

        await moveObject({
          objectId: props.object.id,
          folderId,
        });
      }}
    />
  );
};

export { MoveObjectForm };

// ---------------- end: move-object

/*
start: dialog

In a lot of cases, we want the form inside a dialog 
*/

const FormDialog = (props: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogDescription>{props.description}</DialogDescription>
      </DialogHeader>
      {props.children}
    </DialogContent>
  );
};

export { FormDialog };

// ---------- end: dialog
