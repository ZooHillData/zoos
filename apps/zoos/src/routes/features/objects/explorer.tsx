import type { Object } from "../../../features/objects";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/objects/explorer")({
  component: RouteComponent,
});

import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useComponentProps } from "@zoos/react-table";
import { Table } from "@zoos/react-table-ui";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  ContextMenuContent,
} from "@zoos/shadcn";
import {
  useObjectsTable,
  getObjectsQuery,
  getFeatureProps,
  ToggleDetailsButton,
  DetailsPanel,
  getObjectsTdContextMenu,
  SelectedBreadcrumb,
} from "../../../features/objects";
import { LocationBreadcrumb } from "@zoos/navigation-ui";
import { GlobalSearch } from "../../../features/objects/objects-explorer";
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

  const openObject = (object: Object) => {
    console.log("open object", object);
  };

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
          openObject: openObject,
        }),
      ],
    },
  );

  const navigate = Route.useNavigate();

  if (isObjectsLoading) {
    return <div>Loading...</div>;
  }

  if (!objects || objects.length === 0) {
    return <div>No objects</div>;
  }

  return (
    // <ResizablePanelGroup direction="horizontal" className="mx-auto gap-2">
    //   <ResizablePanel
    //     id="objects-table"
    //     order={1}
    //     className="max-w-6xl space-y-2"
    //   >
    //     <div className="flex items-center gap-2 py-0.5">
    //       <LocationBreadcrumb
    //         className="flex-nowrap"
    //         location={location}
    //         onBreadcrumbClick={setLocation}
    //       />
    //       <GlobalSearch table={table} className="ml-auto w-[300px]" />
    //       <ToggleDetailsButton onClick={() => setDetailsOpen(!detailsOpen)} />
    //     </div>
    <Table
      {...{ table, virtualRows, rowVirtualizer, componentProps }}
      contextMenuContent={{
        td: (cellContext) => {
          return (
            <ContextMenuContent>
              {getObjectsTdContextMenu?.({
                location,
                showDetails: () => setDetailsOpen(true),
                openObject,
              })?.(cellContext)}
            </ContextMenuContent>
          );
        },
      }}
    />
    //     <SelectedBreadcrumb table={table} onBreadcrumbClick={setLocation} />
    //   </ResizablePanel>
    //   {detailsOpen && (
    //     <>
    //       <ResizableHandle />
    //       <ResizablePanel
    //         id="objects-details"
    //         order={2}
    //         defaultSize={25}
    //         minSize={10}
    //       >
    //         <DetailsPanel
    //           table={table}
    //           className="bg-accent h-full overflow-auto p-2"
    //         />
    //       </ResizablePanel>
    //     </>
    //   )}
    // </ResizablePanelGroup>
  );
}
