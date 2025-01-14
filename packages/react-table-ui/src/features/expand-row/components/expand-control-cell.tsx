import type { CellContext } from "@tanstack/react-table";

import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

/** separate expand functionality as a standalone "control" cell */
const ExpandControlCell = <TData, TValue>(props: {
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
export { ExpandControlCell };
