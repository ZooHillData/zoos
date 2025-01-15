import React from "react";

import type { TableState } from "@tanstack/react-table";
import type { FileAttributesWithPermissions } from "./types";

import { Label } from "@zoos/shadcn";
import { InputDebounce } from "@zoos/react-form";
import { getDataTree, searchDataTree } from "@zoos/navigation";
import { LocationBreadcrumb } from "@zoos/navigation-ui";
import { useTable, useComponentProps, featureProps } from "@zoos/react-table";
import { filters, FilterContainer, FormattedId } from "@zoos/react-table-ui";

// In-zoos feature imports
import { columns } from "./column-defs";
import { Table } from "./table";

const FileBrowser = (props: {
  files: FileAttributesWithPermissions[];
  state: TableState;
  onStateChange: (state: TableState) => void;
  location: string;
  onLocationChange: (location: string) => void;
  tableOptions?: Partial<{ initialState: Partial<TableState> }>;
}) => {
  const { files, state, onStateChange, location, onLocationChange } = props;
  const dataTree = React.useMemo(
    () =>
      getDataTree({ data: files })({
        getPath: (row) => row.path.split("/"),
      }),
    [files],
  );

  const [data, setData] = React.useState(dataTree._dataTree.children);

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } = useTable({
    // Standard table
    data,
    columns,
    state,
    onStateChange,
    defaultColumn: {
      header: (headerContext) => <FormattedId headerContext={headerContext} />,
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
    // Hierarchical row options
    getRowId: (row) => row._dataTree.pathStr,
    getSubRows: (row) => row._dataTree.children,
    ...props.tableOptions,
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
                onLocationChange(row.original._dataTree.pathStr);
              }
            },
          }),
        },
      ],
    },
  );

  // When location changes, find that node and set
  // the table data to be those rows
  React.useEffect(() => {
    const node = searchDataTree({
      node: dataTree,
      isMatch: (node) => node._dataTree.pathStr === location,
    });
    setData(node?._dataTree.children || []);
  }, [location, dataTree]);

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <LocationBreadcrumb
          location={location}
          onClick={(path) => {
            onLocationChange(path);
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
};

export { FileBrowser };
