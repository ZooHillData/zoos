import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/file-browser/")({
  component: RouteComponent,
});

import React from "react";

import { type TableState } from "@tanstack/react-table";

import { Label } from "@zoos/shadcn";
import { getDataTree, searchDataTree } from "@zoos/navigation";
import { InputDebounce } from "@zoos/react-form";
import { globalFilterFn, featureProps } from "@zoos/react-table";
import {
  Table,
  useTable,
  useComponentProps,
  filters,
  FilterContainer,
} from "@zoos/react-table-ui";

import { files } from "./-data";
import { LocationBreadcrumb } from "./-feature/components";
import { columns } from "./-feature/columns";

const dataTree = getDataTree({
  // Sort paths prior to building tree
  data: files.sort((a, b) => a.path.localeCompare(b.path)),
})({
  getPath: (row) => row.path.split("/"),
});

function RouteComponent() {
  const [state, setState] = React.useState({} as TableState);
  const [folder, setFolder] = React.useState("/");
  const [data, setData] = React.useState(dataTree._dataTree.children);

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } = useTable({
    data,
    columns,
    initialState: {
      columnVisibility: { _path: false },
    },
    state,
    onStateChange: (state) => setState(state),
    globalFilterFn,
    defaultColumn: {
      filterFn: filters.string.includes.filterFn,
      meta: {
        Filter: (headerContext) => (
          <FilterContainer>
            <Label>{headerContext.column.id} includes</Label>
            <filters.string.includes.FilterInput
              headerContext={headerContext}
              delay={300}
            />
          </FilterContainer>
        ),
      },
    },
    getRowId: (row) => row._dataTree.pathStr,
    getSubRows: (row) => row._dataTree.children,
  });

  const componentProps = useComponentProps(
    {
      table,
      rowVirtualizer,
      scrollContainerRef,
    },
    {
      mergeProps: [
        featureProps.rowStriping(),
        featureProps.spacing.compact(),
        {
          // Borders
          container: { className: "border" },
          thead: { className: "border-b" },
        },
        { thead: { className: "bg-muted" } },
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
          // Double-click row sets folder
          trBody: ({ row }) => ({
            onDoubleClick: () => {
              if (row.subRows.length > 0) {
                setFolder(row.original._dataTree.pathStr);
              }
            },
          }),
        },
      ],
    },
  );

  // When folder changes, find that node and set
  // the table data to be those rows
  React.useEffect(() => {
    const node = searchDataTree({
      node: dataTree,
      isMatch: (node) => node._dataTree.pathStr === folder,
    });
    setData(node?._dataTree.children || []);
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
      <Table {...{ table, virtualRows, componentProps }} />
    </div>
  );
}
