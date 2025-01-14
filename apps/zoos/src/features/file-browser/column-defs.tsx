import { createColumnHelper } from "@tanstack/react-table";

import { TreeNode } from "@zoos/navigation";
import { Checkbox } from "@zoos/shadcn";
import { features } from "@zoos/react-table-ui";

import { type FileAttributes } from "./types";

const columnHelper = createColumnHelper<TreeNode<FileAttributes>>();

const columns = [
  columnHelper.display({
    id: "select",
    // cell: ({ row }) => (
    //   <div className="">
    //     <Checkbox
    //       onCheckedChange={(checked) => {
    //         row.toggleSelected(checked === true);
    //       }}
    //     />
    //   </div>
    // ),
    size: 15,
    enableResizing: false,
  }),
  // features.expandRow.getColumnDef(columnHelper),
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
        <a
          // Link to github
          rel="noreferrer"
          target="_blank"
          href={`https://github.com/zoohilldata/zoos/tree/main${cellContext.cell.row.original._dataTree.pathStr}`}
          className="hover:underline"
        >
          {cellContext.cell.getValue()}
        </a>
      </features.expandRow.ExpandCell>
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
    id: "full_path",
    header: "Full Path",
  }),
];

export { columns };