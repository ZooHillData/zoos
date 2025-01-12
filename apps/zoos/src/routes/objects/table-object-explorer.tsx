import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/objects/table-object-explorer")({
  component: RouteComponent,
});

import React from "react";

import {
  ChevronRightIcon,
  ChevronDownIcon,
  UnfoldVerticalIcon,
  FoldVerticalIcon,
} from "lucide-react";
import { createColumnHelper, TableState } from "@tanstack/react-table";

import { cn, Label } from "@zoos/shadcn";
import { InputDebounce } from "@zoos/react-form";
import { filters, globalFilterFn } from "@zoos/react-table";

import { Table, useTable, FilterContainer } from "../react-table/-react-table";

import { files } from "./-data";
import { buildPathTree, searchPathTree, type PathNode } from "./-lib";
import { LocationBreadcrumb } from "./-components";

// Column defs
const columnHelper = createColumnHelper<PathNode<(typeof files)[0]>>();
const columns = [
  columnHelper.display({ id: "select", header: "", size: 20 }),
  columnHelper.accessor("_leaf", {
    header: (headerContext) => (
      <div className="group flex w-full items-center justify-between text-left">
        Name
        {
          // Expand / collapse on name header
        }
        <div className="flex gap-1 pr-2">
          <UnfoldVerticalIcon
            onClick={() => headerContext.table.toggleAllRowsExpanded(true)}
            className="hover:text-primary invisible size-4 group-hover:visible"
          />
          <FoldVerticalIcon
            onClick={() => headerContext.table.toggleAllRowsExpanded(false)}
            className="hover:text-primary invisible size-4 group-hover:visible"
          />
        </div>
      </div>
    ),
    size: 300,
    cell: ({ row, cell }) => {
      // Parameters
      const levelPadding = 16;
      const chevronSize = 16;
      const hasChildren = row.subRows.length > 0;

      // If no children, add extra padding to the left
      // to offset the chevron
      const nonDirExtraLeftPadding =
        hasChildren || row.depth === 0 ? 0 : chevronSize;
      return (
        <div
          className="flex h-full w-full items-center gap-0.5"
          style={{
            paddingLeft: `${row.depth * levelPadding + nonDirExtraLeftPadding}px`,
          }}
        >
          {hasChildren && (
            <button onClick={() => row.toggleExpanded()}>
              {row.getIsExpanded() ? (
                <ChevronDownIcon
                  style={{ width: chevronSize, height: chevronSize }}
                />
              ) : (
                <ChevronRightIcon
                  style={{ width: chevronSize, height: chevronSize }}
                />
              )}
            </button>
          )}
          <a
            // Link to github
            rel="noreferrer"
            target="_blank"
            href={`https://github.com/zoohilldata/zoos/tree/main${cell.row.original._path}`}
            className="hover:underline"
          >
            {cell.getValue()}
          </a>
        </div>
      );
    },
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

const root = buildPathTree({
  // Sort paths prior to building tree
  data: files.sort((a, b) => a.path.localeCompare(b.path)),
})({
  getParts: (row) => row.path.split("/"),
});

function RouteComponent() {
  const [state, setState] = React.useState({} as TableState);
  const [folder, setFolder] = React.useState("/");
  const [data, setData] = React.useState(root._children);

  const { table, virtualRows, featureProps } = useTable({
    data,
    columns,
    state,
    initialState: {
      columnVisibility: { _path: false },
    },
    globalFilterFn,
    defaultColumn: {
      filterFn: filters.string.includes.filterFn,
      meta: {
        Filter: (headerContext) => (
          <FilterContainer>
            <Label></Label>
            <filters.string.includes.FilterInput
              headerContext={headerContext}
              delay={300}
            />
          </FilterContainer>
        ),
      },
    },
    onStateChange: (state) => setState(state),
    getRowId: (row) => row._path,
    getSubRows: (row) => row._children,
    userProps: {
      // Borders
      container: { className: "border" },
      thead: { className: "border-b" },
      trBody: ({ row }) => ({
        // group is so that we can apply
        // the background color to cells
        className: "hover:cursor-default group",
        onDoubleClick: () => {
          if (row.subRows.length > 0) {
            setFolder(row.original._path);
          }
        },
      }),
      td: ({ cell: { row } }) => ({
        className: cn(
          // TODO - abstract into feature props
          // assign accent background color when
          // the row is hovered
          "group-hover:bg-accent",
          row.original._type === "directory" ? "font-medium" : "",
        ),
      }),
    },
  });

  // When folder changes, find that node and set
  // the table data to be those rows
  React.useEffect(() => {
    const node = searchPathTree({
      node: root,
      isMatch: (node) => node._path === folder,
    });
    setData(node?._children || []);
  }, [folder]);

  return (
    <div className="flex h-full w-fit flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <LocationBreadcrumb
          location={folder}
          onClick={(path) => {
            setFolder(path);
          }}
        />
        <InputDebounce
          className="w-[300px]"
          value={table.getState().globalFilter || ""}
          onChange={(value) => table.setGlobalFilter(value)}
          delay={300}
          placeholder="Search files.."
        />
      </div>
      <Table {...{ table, virtualRows, featureProps }} />
    </div>
  );
}
