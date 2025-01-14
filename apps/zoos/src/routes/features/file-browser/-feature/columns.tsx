import { createColumnHelper } from "@tanstack/react-table";

import { TreeNode } from "@zoos/navigation";

import { ExpandRowCell, ExpandRowHeader } from "./components";
import { FileAttributes } from "./types";

const columnHelper = createColumnHelper<TreeNode<FileAttributes>>();
const columns = [
  columnHelper.display({ id: "select", header: "", size: 20 }),
  // features.expandRow.getColumnDef(columnHelper),
  columnHelper.accessor((row) => row._dataTree.leaf, {
    id: "name",
    header: (headerContext) => (
      <ExpandRowHeader headerContext={headerContext}>Name</ExpandRowHeader>
    ),
    size: 300,
    cell: (cellContext) => (
      <ExpandRowCell cellContext={cellContext} rowDepthIndentPx={16}>
        <a
          // Link to github
          rel="noreferrer"
          target="_blank"
          href={`https://github.com/zoohilldata/zoos/tree/main${cellContext.cell.row.original._dataTree.pathStr}`}
          className="hover:underline"
        >
          {cellContext.cell.getValue()}
        </a>
      </ExpandRowCell>
    ),
  }),
  columnHelper.accessor("last_updated", {
    header: "Last Updated",
    size: 225,
    cell: ({ cell }) => (cell.row.subRows.length > 0 ? "-" : cell.getValue()),
  }),
  columnHelper.accessor(
    (row) => (row._dataTree.children?.length > 0 ? "-" : row.owner),
    {
      id: "owner",
      header: "Owner",
      size: 175,
    },
  ),
  columnHelper.accessor(
    (row) => {
      if ((row._dataTree.children?.length || 0) > 0) {
        return NaN;
      }
      return row.size;
    },
    {
      id: "size",
      header: "Size",
      size: 100,
      cell: ({ cell }) => (cell.row.subRows.length > 0 ? "-" : cell.getValue()),
    },
  ),
  columnHelper.accessor((row) => row._dataTree.pathStr, {
    header: "Full Path",
  }),
];

export { columns };
