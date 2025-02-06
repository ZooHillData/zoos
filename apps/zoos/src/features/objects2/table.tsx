import type { ColumnDef } from "@tanstack/react-table";
import type { Object } from "./db-interface";
import type { TreeNode } from "@zoos/navigation";

import React from "react";

import { useTable, getColumns, ComponentProps } from "@zoos/react-table";
import { getDataTree } from "@zoos/navigation";

/*
start: use-objects-table
--------------------
*/
type TValueObjects = TreeNode<Object>;

type Params = Omit<
  Parameters<typeof useTable<TValueObjects>>[0],
  "columns" | "data"
> & {
  columns?: ColumnDef<TValueObjects>[];
  data?: Object[];
};
const useObjectsTable = ({ data, ...params }: Params) => {
  const { columns } = React.useMemo(() => {
    if (!data || data.length === 0) {
      return { columns: [], dataTree: [] };
    }
    const dataTree = getDataTree({ data })({
      getPath: (row) => (row.objects_folders?.path || "/").split("/"),
    })._dataTree.children;
    return {
      columns: getColumns({ data: dataTree })(),
      dataTree,
    };
  }, [data]);

  const dataTree = React.useMemo(() => {
    if (data && data.length > 0) {
      return getDataTree({ data })({
        getPath: (row) => (row.objects_folders?.path || "/").split("/"),
      })._dataTree.children;
    }
  }, [data]);

  console.log({ columns, dataTree });

  return useTable({
    columns,
    data: dataTree,
    getRowId: (row) => row._dataTree.pathStr,
    getSubRows: (row) => row._dataTree.children,
    ...params,
  });
};

export { useObjectsTable };
export type { TValueObjects };

// ----------- use-objects-table

/*
start: get-feature-props
--------------------------
*/

const getFeatureProps = (params: {
  onLocationChange: (location: string) => void;
}): ComponentProps<TValueObjects, unknown>[] => [
  { th: () => ({ className: "bg-muted" }) },
  {
    // Row hover accent
    trBody: ({ row }) => ({ className: "hover:cursor-default group" }),
    td: () => ({ className: "group-hover:bg-accent" }),
  },
  {
    // Directory row get bolder font
    td: ({ cell: { row } }) => ({
      className: row.subRows.length > 0 ? "font-medium" : "",
    }),
  },
  {
    // Double-click row sets location
    trBody: ({ row }) => ({
      onDoubleClick: () => {
        if (row.subRows.length > 0) {
          params.onLocationChange(row.original._dataTree.pathStr);
        }
      },
    }),
  },
];

export { getFeatureProps };

// ----------- get-feature-props
