import type { ColumnDef } from "@tanstack/react-table";
import type { Object, ObjectsTableData } from "./types";

import React from "react";

import { createColumnHelper } from "@tanstack/react-table";
import { useTable, featureProps, ComponentProps } from "@zoos/react-table";
import { features } from "@zoos/react-table-ui";
import { getDataTree, searchDataTree } from "@zoos/navigation";

/*
start: column-defs
-------------------
*/
const columnHelper = createColumnHelper<ObjectsTableData>();
const columns = [
  columnHelper.accessor((row) => row._dataTree.leaf, {
    id: "name",
    header: (headerContext) => (
      <features.expandRow.ExpandAllHeader headerContext={headerContext}>
        Name
      </features.expandRow.ExpandAllHeader>
    ),
    size: 300,
    cell: (cellContext) => (
      <features.expandRow.ExpandCell
        cellContext={cellContext}
        depthIndentPx={16}
      >
        {cellContext.cell.getValue()}
      </features.expandRow.ExpandCell>
    ),
  }),
  columnHelper.accessor(
    (row) =>
      // If row is a folder, show the folder
      // owner email
      row._dataTree.children?.length > 0
        ? row.folder_owner_email
        : row.owner_email,
    {
      id: "owner",
      header: "Owner",
    },
  ),
  columnHelper.accessor(
    (row) =>
      // If row is a folder, don't show the updated at
      row._dataTree.children?.length > 0 ? "" : row.last_updated_at,
    { id: "last_updated_at", header: "Updated" },
  ),
];

/*
start: use-objects-table
--------------------
*/

type Params = Omit<Parameters<typeof useTable>[0], "columns" | "data"> & {
  columns?: ColumnDef<ObjectsTableData>[];
  data?: Object[];
  location: string;
  onLocationChange: (location: string) => void;
};
const useObjectsTable = ({ data, ...params }: Params) => {
  // Columns
  // const { columns } = React.useMemo(() => {
  //   if (!data || data.length === 0) {
  //     return { columns: [], dataTree: [] };
  //   }
  //   const dataTree = getDataTree({ data })({
  //     getPath: (row) => (row.objects_folders?.path || "/").split("/"),
  //   })._dataTree.children;
  //   return {
  //     columns: getColumns({ data: dataTree })(),
  //     dataTree,
  //   };
  // }, [data]);

  // Data tree
  const dataTree = React.useMemo(() => {
    if (data && data.length > 0) {
      return getDataTree({ data })({
        getPath: (row) => {
          const folderPath = (row.folder_path || "/").split("/");
          return [...folderPath, row.name];
        },
      });
    }
  }, [data]);

  const [locationData, setLocationData] = React.useState(
    dataTree?._dataTree.children || [],
  );

  // When location changes, find that node and set
  // the table data to be those rows
  React.useEffect(() => {
    if (!dataTree) return;
    if (params.location) {
      const node = searchDataTree({
        node: dataTree,
        isMatch: (node) => node._dataTree.pathStr === params.location,
      });
      setLocationData(node?._dataTree.children || []);
    } else {
      setLocationData(dataTree._dataTree.children);
    }
  }, [params.location, dataTree]);

  return useTable({
    columns,
    data: locationData,
    getRowId: (row) => row._dataTree.pathStr,
    getSubRows: (row) => row._dataTree.children,
    ...params,
  });
};

export { useObjectsTable };
export type { ObjectsTableData };

// ----------- use-objects-table

/*
start: get-feature-props
--------------------------
*/

const getFeatureProps = (params: {
  onLocationChange: (location: string) => void;
}): ComponentProps<ObjectsTableData, unknown>[] => [
  featureProps.spacing.compact(),
  { th: () => ({ className: "bg-muted flex" }) },
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
    trBody: ({ row, table }) => ({
      className: row.getIsSelected() ? "bg-accent" : "",
      onClick: (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          row.getToggleSelectedHandler()(event);
        } else {
          table.setRowSelection({ [row.id]: !row.getIsSelected() });
        }
      },
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

/*
start: context-menu-content
*/

// ----------- context-menu-content
