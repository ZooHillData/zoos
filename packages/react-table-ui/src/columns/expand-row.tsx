import { type CellContext, type ColumnHelper } from "@tanstack/react-table";

import { ChevronRightIcon, ChevronDownIcon } from "lucide-react";

const Cell = <TData, TValue>(props: {
  cellContext: CellContext<TData, TValue>;
}) => {
  // Extract props, set defaults
  const {
    cellContext: { row },
  } = props;

  const hasChildren = row.subRows.length > 0;

  if (hasChildren) {
    return (
      <div className="flex h-full items-center">
        <button onClick={() => row.toggleExpanded()}>
          {row.getIsExpanded() ? (
            <ChevronDownIcon className="size-4" />
          ) : (
            <ChevronRightIcon className="size-4" />
          )}
        </button>
      </div>
    );
  }
};

const getColumnDef = <TData,>(columnHelper: ColumnHelper<TData>) => {
  return columnHelper.display({
    id: "select",
    header: "",
    size: 25,
    cell: (cellContext) => <Cell cellContext={cellContext} />,
    enableResizing: false,
  });
};

export { Cell, getColumnDef };
