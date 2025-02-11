import type { ContextMenuContentProp } from "@zoos/react-table-ui";
import type { ColumnDef } from "@tanstack/react-table";
import type { Object, ObjectsTableData } from "./db-interface";

import React from "react";

import {
  ArrowDownToLineIcon,
  BoxIcon,
  BracesIcon,
  CopyIcon,
  ExternalLinkIcon,
  FolderInputIcon,
  FolderPenIcon,
  FolderPlusIcon,
  InfoIcon,
  TrashIcon,
  UserPlusIcon,
} from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";
import { getDataTree, searchDataTree, getBaseObject } from "@zoos/navigation";
import { useTable, featureProps, ComponentProps } from "@zoos/react-table";
import { features } from "@zoos/react-table-ui";
import {
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  Avatar,
  AvatarFallback,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@zoos/shadcn";

import { openDialog, closeDialog, openAlertDialog } from "../../lib/dialog";

import {
  FormDialog,
  FolderForm,
  PermissionsForm,
  RawObjectForm,
  DeleteObjectDialog,
  AddObjectForm,
  MoveObjectForm,
} from "./forms";

/*
start: column-defs
-------------------
*/
const columnHelper = createColumnHelper<ObjectsTableData>();
const columns = [
  columnHelper.accessor((row) => row._dataTree.leaf, {
    id: "name",
    header: (headerContext) => (
      <features.expandRow.ExpandAllHeader headerContext={headerContext}>
        Name
      </features.expandRow.ExpandAllHeader>
    ),
    size: 300,
    cell: (cellContext) => (
      <features.expandRow.ExpandCell
        cellContext={cellContext}
        depthIndentPx={16}
      >
        {cellContext.cell.getValue()}
      </features.expandRow.ExpandCell>
    ),
  }),
  columnHelper.accessor(
    (row) =>
      // If row is a folder, show the folder
      // owner email
      row._dataTree.children?.length > 0
        ? row.folder_owner_email
        : row.owner_email,
    {
      id: "owner",
      header: "Owner",
      size: 100,
      cell: (cellContext) => {
        const email = cellContext.getValue();
        if (!email) return null;

        const initial = email[0].toUpperCase();
        return (
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{initial}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{email}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
  ),
  columnHelper.accessor(
    (row) =>
      // If row is a folder, don't show the updated at
      row._dataTree.children?.length > 0 ? "" : row.last_updated_at,
    {
      id: "last_updated_at",
      header: "Updated",
      cell: (cellContext) => {
        const value = cellContext.getValue();
        if (!value) return null;

        /**
         * Formats a date based on how recent it is:
         * - If today: shows time (e.g. "2:30 PM")
         * - If yesterday: shows "yesterday"
         * - Otherwise: shows date (e.g. "Mar 15, 2024")
         */
        const formatLastUpdated = (value: Date) => {
          const date = new Date(value);
          const now = new Date();

          // Normalize both dates to start of day in local timezone
          const normalizedDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
          );
          const normalizedToday = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
          );

          // Calculate days difference
          const diffTime = normalizedDate.getTime() - normalizedToday.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const dateFormatter = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          let displayText;
          if (diffDays === 0) {
            displayText = date.toLocaleTimeString();
          } else if (diffDays === -1) {
            displayText = "yesterday";
          } else {
            displayText = dateFormatter.format(date);
          }
          return displayText;
        };

        return (
          <div className="flex flex-col">
            <span className="text-sm">{formatLastUpdated(value)}</span>
          </div>
        );
      },
    },
  ),
];

/*
start: use-objects-table
--------------------
*/

type TableParams = Parameters<typeof useTable<ObjectsTableData>>[0];
type Params = Omit<TableParams, "columns" | "data"> & {
  columns?: ColumnDef<ObjectsTableData>[];
  data?: Object[];
  location: string;
  onLocationChange: (location: string) => void;
};
const useObjectsTable = ({ data, ...params }: Params) => {
  // Data tree
  const dataTree = React.useMemo(() => {
    if (data && data.length > 0) {
      return getDataTree({ data })({
        getPath: (row) => {
          const folderPath = (row.folder_path || "/").split("/");
          return [...folderPath, row.name];
        },
      });
    }
  }, [data]);

  const [locationData, setLocationData] = React.useState(
    dataTree?._dataTree.children || [],
  );

  // When location changes, find that node and set
  // the table data to be those rows
  React.useEffect(() => {
    if (!dataTree) return;
    if (params.location) {
      const node = searchDataTree({
        node: dataTree,
        isMatch: (node) => node._dataTree.pathStr === params.location,
      });
      setLocationData(node?._dataTree.children || []);
    } else {
      setLocationData(dataTree._dataTree.children);
    }
  }, [params.location, dataTree]);

  return useTable({
    columns,
    data: locationData,
    getRowId: (row) => row._dataTree.pathStr,
    getSubRows: (row) => row._dataTree.children,
    ...params,
  });
};

export { useObjectsTable };
export type { ObjectsTableData };

// ----------- use-objects-table

/*
start: get-feature-props
--------------------------
*/

const getFeatureProps = (params: {
  onLocationChange: (location: string) => void;
}): ComponentProps<ObjectsTableData, unknown>[] => [
  featureProps.utils.allCells({ className: "whitespace-nowrap" }),
  {
    container: { className: "border text-sm" },
    tdContextMenu: () => ({
      className: "whitespace-nowrap px-3 py-2 bg-background flex items-center",
    }),
    th: () => ({
      className: "whitespace-nowrap px-3 py-2 flex bg-background",
    }),
    td: () => ({ className: "p-0" }),
    trHead: () => ({ className: "border-b-2" }),
    trBody: () => ({
      className: "border-b",
    }),
  },
  {
    // Row hover accent
    trBody: ({ row }) => ({ className: "hover:cursor-default group" }),
    td: () => ({ className: "group-hover:bg-accent" }),
  },
  {
    // Directory row get bolder font
    td: ({ cellContext: { row } }) => ({
      className: row.subRows.length > 0 ? "font-medium" : "",
    }),
  },
  {
    // Double-click row sets location
    trBody: ({ row, table }) => ({
      className: row.getIsSelected() ? "bg-accent" : "",
      onClick: (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          row.getToggleSelectedHandler()(event);
        } else {
          table.setRowSelection({ [row.id]: !row.getIsSelected() });
        }
      },
      onDoubleClick: () => {
        if (row.subRows.length > 0) {
          params.onLocationChange(row.original._dataTree.pathStr);
        }
      },
    }),
  },
];

export { getFeatureProps };

// ----------- get-feature-props

/*
start: context-menu-content
*/

/**
 *
 * @param showDetails call this function to show the details panel
 * @returns
 */
const getObjectsTdContextMenu =
  (params: {
    location: string;
    showDetails: () => void;
  }): ContextMenuContentProp<ObjectsTableData, unknown>["td"] =>
  (cellContext) => {
    const { table, row } = cellContext;
    const rowId = row.original.id;

    return (
      <>
        {/* New object / folder */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>New</ContextMenuSubTrigger>
          <ContextMenuPortal>
            <ContextMenuSubContent>
              <ContextMenuItem
                className="gap-2"
                onSelect={() => {
                  openDialog({
                    content: (
                      <FormDialog
                        title="New Object"
                        description="Create a new object"
                      >
                        <AddObjectForm
                          mutationOptions={{
                            onSuccess: () => closeDialog(),
                          }}
                        />
                      </FormDialog>
                    ),
                  });
                }}
              >
                <BoxIcon className="size-4" />
                Object
              </ContextMenuItem>
              <ContextMenuItem
                className="gap-2"
                onSelect={() => {
                  openDialog({
                    content: (
                      <FormDialog
                        title="New Folder"
                        description={`Create folder in ${params.location}`}
                      >
                        <FolderForm
                          mutationOptions={{ onSuccess: () => closeDialog() }}
                        />
                      </FormDialog>
                    ),
                  });
                }}
              >
                <FolderPlusIcon className="size-4" />
                Folder
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuPortal>
        </ContextMenuSub>
        {/* Opening the object */}
        <ContextMenuSeparator className="mx-1 border-b" />
        <ContextMenuItem
          className="gap-2"
          onSelect={() => console.log("Open")}
          disabled
        >
          <ExternalLinkIcon className="size-4" /> Open
        </ContextMenuItem>
        <ContextMenuItem
          className="gap-2"
          onSelect={() => {
            openDialog({
              content: (
                <FormDialog
                  title="New Folder"
                  description="Create a new folder"
                >
                  <RawObjectForm
                    object={getBaseObject(row.original)}
                    mutationOptions={{
                      onSuccess: () => closeDialog(),
                    }}
                  />
                </FormDialog>
              ),
            });
          }}
        >
          <BracesIcon className="size-4" /> Open Raw
        </ContextMenuItem>
        {/* */}
        <ContextMenuSeparator className="mx-1 border-b" />
        <ContextMenuItem
          className="gap-2"
          onSelect={() => console.log("Rename")}
          disabled
        >
          <FolderPenIcon className="size-4" />
          Rename
        </ContextMenuItem>
        <ContextMenuItem
          className="gap-2"
          onSelect={() => console.log("Download")}
          disabled
        >
          <ArrowDownToLineIcon className="size-4" /> Download
        </ContextMenuItem>
        <ContextMenuItem
          className="gap-2"
          onSelect={() => console.log("Duplicate")}
          disabled
        >
          <CopyIcon className="size-4" />
          Duplicate
        </ContextMenuItem>
        {/* Share / Organize / Details*/}
        <ContextMenuSeparator className="mx-1 border-b" />
        <ContextMenuItem
          className="gap-2"
          onSelect={() => {
            openDialog({
              content: (
                <FormDialog
                  title="New Folder"
                  description="Create a new folder"
                >
                  <PermissionsForm
                    object={getBaseObject(row.original)}
                    mutationOptions={{ onSuccess: () => closeDialog() }}
                  />
                </FormDialog>
              ),
            });
          }}
        >
          <UserPlusIcon className="size-4" />
          Share
        </ContextMenuItem>
        <ContextMenuItem
          className="gap-2"
          onSelect={() => {
            openDialog({
              content: (
                <FormDialog
                  title={`Move ${row.original.name}`}
                  description="Create a new folder"
                >
                  <MoveObjectForm
                    object={getBaseObject(row.original)}
                    mutationOptions={{ onSuccess: () => closeDialog() }}
                  />
                </FormDialog>
              ),
            });
          }}
        >
          <FolderInputIcon className="size-4" />
          Move
        </ContextMenuItem>
        <ContextMenuItem
          className="gap-2"
          onSelect={() => {
            table.setRowSelection({ [rowId]: true });
            params.showDetails();
          }}
        >
          <InfoIcon className="size-4" />
          Details
        </ContextMenuItem>
        {/* Delete */}
        <ContextMenuSeparator className="mx-1 border-b" />
        <ContextMenuItem
          className="focus:bg-destructive focus:text-destructive-foreground gap-2"
          onSelect={() =>
            openAlertDialog({
              content: (
                <DeleteObjectDialog object={getBaseObject(row.original)} />
              ),
            })
          }
        >
          <TrashIcon className="size-4" />
          Delete
        </ContextMenuItem>
      </>
    );
  };

export { getObjectsTdContextMenu };

// ----------- context-menu-content
