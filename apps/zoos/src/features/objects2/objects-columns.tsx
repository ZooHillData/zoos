import type { Object } from "./db-interface";

import { createColumnHelper } from "@tanstack/react-table";
import { features } from "@zoos/react-table-ui";

const columnHelper = createColumnHelper<Object>();

const columns = [
  columnHelper.display({
    id: "select",
    header: "",
    size: 15,
    enableResizing: false,
  }),
  // features.expandRow.getColumnDef(columnHelper),
  columnHelper.accessor((row) => row.name, {
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
  columnHelper.accessor("last_updated_at", {
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
      cell: ({ cell }) => {
        const owner = cell.getValue();
        if (owner !== "-") {
          return <UserAvatar src={owners[owner]} alt={owner} />;
        }
      },
    },
  ),
  ...(["read", "write", "manage"] as const).map((columnId) =>
    columnHelper.accessor(columnId, {
      cell: ({ cell }) => {
        const permissions = cell.getValue();
        return (
          <div className="flex gap-1">
            {permissions.map((permission) => (
              <UserAvatar
                key={permission}
                src={owners[permission]}
                alt={permission}
              />
            ))}
          </div>
        );
      },
    }),
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
