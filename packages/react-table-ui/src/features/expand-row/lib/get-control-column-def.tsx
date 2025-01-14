import type { ColumnHelper } from "@tanstack/react-table";

import { ExpandControlCell } from "../components";

/**
 * For the control column, get the full column def
 *
 * includes things like making the column not resizable, no header and a display
 * column def
 */
const getControlColumnDef = <TData,>(columnHelper: ColumnHelper<TData>) => {
  return columnHelper.display({
    id: "expand",
    size: 25,
    header: "",
    cell: (cellContext) => <ExpandControlCell cellContext={cellContext} />,
    enableResizing: false,
  });
};

export { getControlColumnDef };
