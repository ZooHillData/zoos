import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/objects/explorer")({
  component: RouteComponent,
});

import React from "react";

import {
  ArrowDownToLineIcon,
  BombIcon,
  BracesIcon,
  CopyIcon,
  ExternalLinkIcon,
  FolderOpenIcon,
  FolderPenIcon,
  InfoIcon,
  TrashIcon,
  UserPlusIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useComponentProps } from "@zoos/react-table";
import { Table } from "@zoos/react-table-ui";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@zoos/shadcn";
import {
  useObjectsTable,
  getObjectsQuery,
  getFeatureProps,
  ToggleDetailsButton,
  DetailsPanel,
} from "../../../features/objects2";
import { LocationBreadcrumb } from "@zoos/navigation-ui";

function RouteComponent() {
  const { data: objects, isLoading: isObjectsLoading } = useQuery(
    getObjectsQuery({ params: {} }),
  );

  // State for the details panel
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [location, setLocation] = React.useState("/");

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } =
    useObjectsTable({
      data: objects,
      location: location,
      onLocationChange: setLocation,
    });

  const componentProps = useComponentProps(
    {
      table,
      rowVirtualizer,
      scrollContainerRef,
    },
    {
      mergeProps: [
        ...getFeatureProps({
          onLocationChange: (location) => setLocation(location),
        }),
      ],
    },
  );

  if (isObjectsLoading) {
    return <div>Loading...</div>;
  }

  if (!objects || objects.length === 0) {
    return <div>No objects</div>;
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="gap-2">
      <ResizablePanel id="objects-table" order={1}>
        <div className="flex justify-between">
          <LocationBreadcrumb location={location} onClick={setLocation} />
          <ToggleDetailsButton onClick={() => setDetailsOpen(!detailsOpen)} />
        </div>
        <Table
          {...{ table, virtualRows, componentProps }}
          contextMenuContent={{
            td: ({ row, cell, table }) => {
              const rowId = row.original.id;

              return (
                <ContextMenuContent>
                  {/* Opening the object */}
                  <ContextMenuItem
                    className="gap-2"
                    onSelect={() => console.log("Open")}
                    disabled
                  >
                    <ExternalLinkIcon className="size-4" /> Open
                  </ContextMenuItem>
                  <ContextMenuItem
                    className="gap-2"
                    onSelect={() => console.log("Edit")}
                    disabled
                  >
                    <BracesIcon className="size-4" /> View Raw
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
                    onSelect={() => console.log("Share")}
                    disabled
                  >
                    <UserPlusIcon className="size-4" />
                    Share
                  </ContextMenuItem>
                  <ContextMenuItem
                    className="gap-2"
                    onSelect={() => console.log("Organize")}
                    disabled
                  >
                    <FolderOpenIcon className="size-4" />
                    Organize
                  </ContextMenuItem>
                  <ContextMenuItem
                    className="gap-2"
                    onSelect={() => console.log("Details")}
                    disabled
                  >
                    <InfoIcon className="size-4" />
                    Details
                  </ContextMenuItem>
                  {/* Delete */}
                  <ContextMenuSeparator className="mx-1 border-b" />
                  <ContextMenuItem
                    className="focus:bg-destructive focus:text-destructive-foreground gap-2"
                    onSelect={() => console.log("Move to Trash")}
                    disabled
                  >
                    <TrashIcon className="size-4" />
                    Move to Trash
                  </ContextMenuItem>
                  <ContextMenuItem
                    className="focus:bg-destructive focus:text-destructive-foreground gap-2"
                    onSelect={() => console.log("Delete Permanently")}
                    disabled
                  >
                    <BombIcon className="size-4" />
                    Delete Immediately
                  </ContextMenuItem>
                </ContextMenuContent>
              );
            },
          }}
        />
      </ResizablePanel>
      {detailsOpen && (
        <>
          <ResizableHandle />
          <ResizablePanel
            id="objects-details"
            order={2}
            defaultSize={25}
            minSize={10}
          >
            <DetailsPanel
              table={table}
              className="bg-accent h-full overflow-auto p-2"
            />
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
}
