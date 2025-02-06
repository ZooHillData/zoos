import { type Json } from "../db/objects-database.types";
import type { CellContext } from "@tanstack/react-table";
import type { Object } from "../types";

import {
  ContextMenuItem,
  DialogContent,
  DialogTitle,
  DialogHeader,
  Textarea,
  DialogDescription,
  Button,
  useReactiveState,
  ContextMenuSeparator,
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@zoos/shadcn";

import { closeDialog, openDialog } from "../../../lib/dialog";

import { PermissionsForm } from "../components/permissions-form";
import {
  getAutomaticInfoFields,
  getEditableInfoFields,
} from "../db/parse-objects";

import { EditObjectForm } from "../components/edit-object";

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
  onUpdateObject: (params: { id: number } & Partial<Object>) => void;
}) => {
  const editableInfoFields = getEditableInfoFields(cell.row.original);
  const uneditableInfoFields = getAutomaticInfoFields(cell.row.original);

  return (
    <>
      <ContextMenuItem
        onSelect={(e) => {
          // Open the edit object dialog
          openDialog({
            content: (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Details</DialogTitle>
                  <DialogDescription>
                    {cell.row.original.name}
                  </DialogDescription>
                </DialogHeader>
                <EditObjectForm
                  object={cell.row.original}
                  onUpdateObject={props.onUpdateObject}
                />
              </DialogContent>
            ),
          });
        }}
      >
        Details
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
                    Edit the object data itself (the most basic form of editing
                    is editing the JSON blob directly)
                  </DialogDescription>
                </DialogHeader>
                <JsonForm
                  value={
                    cell.row.original.object_data as Record<string, unknown>
                  }
                  onSubmit={(value) => {
                    props.onUpdateObject({
                      id: cell.row.original.id,
                      object_data: value as Json,
                    });
                    closeDialog();
                  }}
                />
              </DialogContent>
            ),
          });
        }}
      >
        Object
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
                    props.onUpdateObject({
                      id: cell.row.original.id,
                      access_read_emails: value.read,
                      access_write_emails: value.write,
                      access_manage_emails: value.manage,
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
      <ContextMenuSeparator className="mx-1 border-b" />
      {cell.row.original.objects_history.length > 0 && (
        <ContextMenuItem
          onSelect={(e) => {
            // Open the edit object dialog
            // Open the edit object dilog
            openDialog({
              content: (
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Version History</DialogTitle>
                    <DialogDescription>
                      View, manage and tag version history
                    </DialogDescription>
                  </DialogHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Version</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Updater</TableHead>
                        <TableHead>Tag</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cell.row.original.objects_history.map((history, idx) => (
                        <TableRow key={`${history.id},${history.updated_at}`}>
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>
                            {new Date(history.updated_at).toLocaleString()}
                          </TableCell>
                          <TableCell>{history.update_email}</TableCell>
                          <TableCell>{history.tag}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
              ),
            });
          }}
        >
          History
        </ContextMenuItem>
      )}
    </>
  );
};

export { objectsContextMenuItems };
