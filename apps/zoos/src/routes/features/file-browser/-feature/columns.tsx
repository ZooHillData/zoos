import { createColumnHelper } from "@tanstack/react-table";

import { type PathNode } from "@zoos/navigation";

import { ExpandRowCell, ExpandRowHeader } from "./components";
import { FileAttributes } from "./types";

const columnHelper = createColumnHelper<PathNode<FileAttributes>>();
const columns = [
  columnHelper.display({ id: "select", header: "", size: 20 }),
  // features.expandRow.getColumnDef(columnHelper),
  columnHelper.accessor("_leaf", {
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
          href={`https://github.com/zoohilldata/zoos/tree/main${cellContext.cell.row.original._path}`}
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
    cell: ({ cell }) =>
      cell.row.original._type === "directory" ? "-" : cell.getValue(),
  }),
  columnHelper.accessor(
    (row) => (row._type === "directory" ? "-" : row.owner),
    {
      id: "owner",
      header: "Owner",
      size: 175,
    },
  ),
  columnHelper.accessor(
    (row) => {
      if ((row._children?.length || 0) > 0) {
        return NaN;
      }
      return row.size;
    },
    {
      id: "size",
      header: "Size",
      size: 100,
      cell: ({ cell }) =>
        cell.row.original._type === "directory" ? "-" : cell.getValue(),
    },
  ),
  columnHelper.accessor("_path", { header: "Full Path" }),
];

export { columns };
