import { createColumnHelper } from "@tanstack/react-table";

import { Avatar, AvatarImage, AvatarFallback } from "@zoos/shadcn";
import { TreeNode } from "@zoos/navigation";
import { features, filters } from "@zoos/react-table-ui";

import type { FileAttributesWithPermissions } from "./types";
import alex from "../../assets/alex-snail.svg";
import bryce from "../../assets/bryce-dolphin.svg";
import borst from "../../assets/borst-turtle.svg";
import brian from "../../assets/brian-monkey.svg";

const owners: Record<string, string> = {
  "art@zoohilldata.com": alex,
  "bk@zoohilldata.com": brian,
  "borst@zoohilldata.com": borst,
  "bryce@zoohilldata.com": bryce,
};
const ownerOptions = Object.keys(owners);

const UserAvatar = ({
  src,
  alt,
  fallback = alt[0],
}: {
  src: string;
  alt: string;
  fallback?: string;
}) => (
  <Avatar className="bg-popover size-6 border p-1">
    <AvatarImage src={src} alt={alt} />
    {/* <AvatarFallback>{fallback}</AvatarFallback> */}
  </Avatar>
);

const columnHelper =
  createColumnHelper<TreeNode<FileAttributesWithPermissions>>();

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
    header: "",
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

export { columns, ownerOptions };
