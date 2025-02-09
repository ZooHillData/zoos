import type { Table as TableType } from "@tanstack/react-table";
import type { ObjectsTableData } from "./db-interface";

import { InfoIcon } from "lucide-react";
import { Button } from "@zoos/shadcn";
import { LocationBreadcrumb } from "@zoos/navigation-ui";

const ToggleDetailsButton = (props: React.ComponentProps<"button">) => (
  <Button size="icon" variant="ghost" {...props}>
    <InfoIcon />
  </Button>
);

type DetailsPanelProps = React.ComponentProps<"div"> & {
  table: TableType<ObjectsTableData>;
};
const DetailsPanel = ({ table, ...props }: DetailsPanelProps) => {
  const selectedRows = table.getSelectedRowModel().flatRows;

  // If no selected rows, return "Select an object to see details"
  // If > 1 selected row, return "{selectedRows.length} objects selected"
  // If 1 selected row, return details of selected row
  const headerMarkup = <h2>Details</h2>;
  const detailsMarkup =
    selectedRows.length === 0 ? (
      <p>Select an object to see details</p>
    ) : selectedRows.length > 1 ? (
      <p>{selectedRows.length} objects selected</p>
    ) : (
      <pre>{JSON.stringify(selectedRows[0].original, null, 2)}</pre>
    );

  return (
    <div {...props}>
      {headerMarkup}
      {detailsMarkup}
    </div>
  );
};

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

export { ToggleDetailsButton, DetailsPanel, SelectedBreadcrumb };
