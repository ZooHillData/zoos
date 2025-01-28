import type { CellContext } from "@tanstack/react-table";
import type { Object } from "./db-interface";
import type { Permissions } from "./permissions-form";

import {
  ContextMenuItem,
  DialogContent,
  DialogTitle,
  DialogHeader,
  Textarea,
  DialogDescription,
  Button,
  useReactiveState,
} from "@zoos/shadcn";

import { closeDialog, openDialog } from "../../lib/dialog";

import { PermissionsForm } from "./permissions-form";

const JsonForm = (props: {
  value: Record<string, unknown>;
  onSubmit: (value: Record<string, unknown>) => void;
}) => {
  const [value, setValue] = useReactiveState(
    JSON.stringify(props.value, null, 2).replace(/\\"/g, '"'),
  );

  return (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(JSON.parse(value));
      }}
    >
      <Textarea
        className="h-[200px]"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

const objectsContextMenuItems = <TValue,>({
  cellContext: { cell },
  ...props
}: {
  users: string[];
  cellContext: CellContext<Object, TValue>;
  onSaveMetadata: (params: {
    id: number;
    metadata: Object["metadata"];
  }) => void;
  onSaveObject: (params: { id: number; data: Object["object_data"] }) => void;
  onSavePermissions: (params: { id: number; permissions: Permissions }) => void;
}) => (
  <>
    <ContextMenuItem
      onSelect={(e) => {
        // Open the edit object dialog
        openDialog({
          content: (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Metadat</DialogTitle>
                <DialogDescription>
                  Edit metadata surrounding the object, not the object itself
                </DialogDescription>
              </DialogHeader>
              <JsonForm
                value={cell.row.original.metadata}
                onSubmit={(value) => {
                  props.onSaveMetadata({
                    id: cell.row.original.id,
                    metadata: value,
                  });
                  closeDialog();
                }}
              />
            </DialogContent>
          ),
        });
      }}
    >
      Edit Metadata
    </ContextMenuItem>
    <ContextMenuItem
      onSelect={(e) => {
        // Open the edit object dialog
        openDialog({
          content: (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Object</DialogTitle>
                <DialogDescription>
                  Edit the object data itself (the most basic form of editing is
                  editing a JSON blob)
                </DialogDescription>
              </DialogHeader>
              <JsonForm
                value={cell.row.original.object_data}
                onSubmit={(value) => {
                  props.onSaveObject({ id: cell.row.original.id, data: value });
                  closeDialog();
                }}
              />
            </DialogContent>
          ),
        });
      }}
    >
      Edit Object
    </ContextMenuItem>
    <ContextMenuItem
      onSelect={(e) => {
        // Open the edit object dilog
        openDialog({
          content: (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share</DialogTitle>
                <DialogDescription>
                  Modify access to this object
                </DialogDescription>
              </DialogHeader>
              <PermissionsForm
                permissions={{
                  read: cell.row.original.access_read_emails,
                  write: cell.row.original.access_write_emails,
                  manage: cell.row.original.access_manage_emails,
                }}
                options={props.users}
                onSubmit={(value) => {
                  props.onSavePermissions({
                    id: cell.row.original.id,
                    permissions: value,
                  });
                  closeDialog();
                }}
              />
            </DialogContent>
          ),
        });
      }}
    >
      Share
    </ContextMenuItem>
  </>
);

export { objectsContextMenuItems };
