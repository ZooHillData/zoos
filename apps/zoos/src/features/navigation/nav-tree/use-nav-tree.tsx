import { Link } from "@tanstack/react-router";

import type { TableState, ColumnDef } from "@tanstack/react-table";

import React from "react";

import { useTable, getColumns, mergeColumns } from "@zoos/react-table";
import { features } from "@zoos/react-table-ui";
import { getDataTree } from "@zoos/navigation";

const useNavTree = <T extends object>(params: {
  paths: T[];
  getPath: (row: T) => string[];
  columns: ColumnDef<T>[];
}) => {
  const { paths, getPath } = params;

  const { data, columns } = React.useMemo(() => {
    // Get the hierarchical data tree from flat string-based paths
    const data = getDataTree({ data: paths })({
      getPath,
    })._dataTree.children;

    // Get columns
    const inferColumns = getColumns({ data })();
    const columns = mergeColumns({ base: inferColumns })({
      newPlacement: "start",
      newColumns: [
        {
          id: "leaf",
          accessorFn: (row) => row._dataTree.leaf,
          cell: (cellContext) => (
            <features.expandRow.ExpandCell
              cellContext={cellContext}
              depthIndentPx={16}
            >
              <Link to={cellContext.cell.row.original._dataTree.pathStr}>
                {cellContext.cell.getValue() as string}
              </Link>
            </features.expandRow.ExpandCell>
          ),
        },
      ],
    });

    return {
      data,
      columns,
    };
  }, [paths, getPath]);

  const [state, setState] = React.useState({} as TableState);
  const { table } = useTable({
    data,
    columns,
    state,
    onStateChange: (state) => setState(state),
    getSubRows: (row) => row._dataTree.children,
    getRowId: (row) => row._dataTree.pathStr,
  });

  return { table, data, columns };
};

export { useNavTree };
