import type { Table as TableType } from "@tanstack/react-table";
import type { ObjectsTableData } from "./types";

import { InfoIcon } from "lucide-react";
import { Button } from "@zoos/shadcn";

const ToggleDetailsButton = (props: React.ComponentProps<"button">) => (
  <Button size="icon" variant="outline" {...props}>
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

export { ToggleDetailsButton, DetailsPanel };
