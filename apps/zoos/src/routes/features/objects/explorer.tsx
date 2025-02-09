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
  getObjectsTdContext,
  SelectedBreadcrumb,
} from "../../../features/objects";
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
      <ResizablePanel id="objects-table" order={1} className="space-y-2">
        <div className="flex items-center justify-between">
          <LocationBreadcrumb
            location={location}
            onBreadcrumbClick={setLocation}
          />
          <ToggleDetailsButton onClick={() => setDetailsOpen(!detailsOpen)} />
        </div>
        <Table
          {...{ table, virtualRows, componentProps }}
          contextMenuContent={{
            td: (cellContext) => {
              return (
                <ContextMenuContent>
                  {getObjectsTdContext?.({
                    showDetails: () => setDetailsOpen(true),
                  })?.(cellContext)}
                </ContextMenuContent>
              );
            },
          }}
        />
        <SelectedBreadcrumb table={table} onBreadcrumbClick={setLocation} />
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
