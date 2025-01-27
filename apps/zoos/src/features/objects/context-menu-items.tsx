import type { CellContext } from "@tanstack/react-table";
import type { Object } from "./db-interface";

import {
  ContextMenuItem,
  DialogContent,
  DialogTitle,
  DialogHeader,
  Textarea,
} from "@zoos/shadcn";
import { openDialog } from "../../lib/dialog";

import { PermissionsForm } from "./permissions-form";

const objectsContextMenuItems = <TValue,>({
  cellContext: { cell },
  users,
}: {
  users: string[];
  cellContext: CellContext<Object, TValue>;
}) => (
  <>
    <ContextMenuItem
      onSelect={(e) => {
        // Open the edit object dialog
        const { object_data, ...rest } = cell.row.original;
        openDialog({
          content: (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Metadata</DialogTitle>
              </DialogHeader>
              <Textarea className="bg-muted text-muted-foreground h-[300px] w-full">
                {JSON.stringify(rest, null, 2)}
              </Textarea>
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
              </DialogHeader>
              <Textarea className="bg-muted text-muted-foreground h-[300px] w-full">
                {JSON.stringify(cell.row.original.object_data, null, 2)}
              </Textarea>
            </DialogContent>
          ),
        });
      }}
    >
      Open
    </ContextMenuItem>
    <ContextMenuItem
      onSelect={(e) => {
        // Open the edit object dialog
        openDialog({
          content: (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share</DialogTitle>
              </DialogHeader>
              <PermissionsForm
                permissions={{
                  read: cell.row.original.access_read,
                  write: cell.row.original.access_write,
                  manage: cell.row.original.access_manage,
                }}
                options={users}
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
