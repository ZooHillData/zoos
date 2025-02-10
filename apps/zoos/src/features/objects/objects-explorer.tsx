import type { Table as TableType } from "@tanstack/react-table";
import type { ObjectsTableData } from "./db-interface";

import { InfoIcon } from "lucide-react";
import { Button } from "@zoos/shadcn";
import { LocationBreadcrumb } from "@zoos/navigation-ui";

/*
start: toggle-details-button
*/

const ToggleDetailsButton = (props: React.ComponentProps<"button">) => (
  <Button size="icon" variant="ghost" {...props}>
    <InfoIcon />
  </Button>
);

/*
end: toggle-details-buttons 
*/

/*
start: details-panel
*/

type DetailsPanelProps = React.ComponentProps<"div"> & {
  table: TableType<ObjectsTableData>;
};
const DetailsPanel = ({ table, ...props }: DetailsPanelProps) => {
  const selectedRows = table.getSelectedRowModel().flatRows;

  if (selectedRows.length === 0) {
    return <div>Select an obect to see details</div>;
  }

  if (selectedRows.length > 1) {
    return <div>{selectedRows.length} objects selected</div>;
  }

  return (
    <div {...props}>
      <pre>{JSON.stringify(selectedRows[0].original, null, 2)}</pre>
    </div>
  );
};

/*
end: details-panel
*/

/* 
start: selected-breadcrumb

When a single object is selected, show the corresponding breadcrumbs
below the table.
*/

const SelectedBreadcrumb = (props: {
  table: TableType<ObjectsTableData>;
  onBreadcrumbClick?: (path: string) => void;
}) => {
  const selectedRows = props.table.getSelectedRowModel().flatRows;
  if (selectedRows.length === 1) {
    const row = selectedRows[0];
    const fullPath = row.original._dataTree.pathStr;
    return (
      <LocationBreadcrumb
        location={fullPath}
        onBreadcrumbClick={(location) => {
          if (location.split("/").length < fullPath.split("/").length) {
            props.onBreadcrumbClick?.(location);
          }
        }}
      />
    );
  }
};

/*
end: selected-breadcrumb
*/

export { ToggleDetailsButton, DetailsPanel, SelectedBreadcrumb };
