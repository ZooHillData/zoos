import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/react-table/standard")({
  component: RouteComponent,
});

import React from "react";
import { type User } from "../../lib/fake-data";

import {
  createColumnHelper,
  type TableState,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<User>();
const columns: ColumnDef<User>[] = [
  columnHelper.group({
    header: "Person",
    columns: [
      columnHelper.accessor("first_name", {}),
      columnHelper.accessor("last_name", {}),
      columnHelper.accessor("age", {}),
    ],
  }),
  columnHelper.group({
    header: "Address",
    columns: [
      columnHelper.accessor("street", {}),
      columnHelper.accessor("city", {}),
      columnHelper.accessor("state", {}),
      columnHelper.accessor("zip", {}),
    ],
  }),
];

import {
  useControlledTable,
  useVirtualization,
  HeaderProperId,
  HeaderContextMenu,
  HeaderSortIndicator,
  featureProps,
  mergeFeatureProps,
} from "@zoos/react-table";

function RouteComponent() {
  const { data } = Route.useRouteContext();

  const [state, setState] = React.useState({} as TableState);

  // Table with single state / onStateChange
  // plus a couple other goodies (filterFns)
  const { table } = useControlledTable({
    data,
    columns,
    defaultColumn: {
      // Split column ID into words and capitalize
      header: HeaderProperId,
    },
    state,
    onStateChange: (state) => setState(state),
  });

  // Row and column virtualization
  const { scrollContainerRef, rowVirtualizer, virtualRows } = useVirtualization(
    {
      table,
      rowOptions: {
        estimateSize: () => 20,
        overscan: 5,
      },
      columnOptions: {
        overscan: 3,
      },
    },
  );

  // Get component props leverage the feature props functions
  const isResizingColumn = !!table.getState().columnSizingInfo.isResizingColumn;
  const componentProps = React.useMemo(
    () =>
      mergeFeatureProps([
        featureProps.rowVirtualization({ scrollContainerRef, rowVirtualizer }),
        featureProps.stickyHeader({
          custom: { thead: { className: "bg-background" } },
        }),
        featureProps.resizeColumn({
          isResizingColumn,
          custom: { resizeCol: { className: "bg-primary" } },
        }),
        featureProps.borders(),
        // Small text
        { container: { className: "text-sm" } },
        {
          // Padding
          th: () => ({ className: "px-1 py-0.5" }),
          td: () => ({ className: "px-1 py-0.5" }),
        },
        {
          // Striping
          td: ({ virtualRow }) => ({
            className:
              virtualRow.index % 2 === 0 ? "bg-accent" : "bg-background",
          }),
        },
      ]),
    [isResizingColumn, rowVirtualizer, scrollContainerRef],
  );

  return (
    <div className="h-full p-8">
      <div {...componentProps.container}>
        <table {...componentProps.table}>
          {
            // ~ THEAD
          }
          <thead {...componentProps.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              // ~ Header row
              <tr key={headerGroup.id} {...componentProps.trHead}>
                {headerGroup.headers.map((header) => {
                  return (
                    // ~ Header cell
                    <th key={header.id} {...componentProps.th?.({ header })}>
                      <HeaderContextMenu
                        // Header context menu provides right click
                        header={header.getContext()}
                        className="flex w-full justify-between"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        <HeaderSortIndicator
                          // Sort indicator
                          header={header}
                          className="text-primary"
                          onClick={() => header.column.toggleSorting()}
                        />
                      </HeaderContextMenu>
                      <div
                        // Resize column handle
                        {...componentProps.resizeCol}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                      />
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {
            // ~ TBODY
          }
          <tbody {...componentProps.tbody}>
            {virtualRows.map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                // ~ Data row
                <tr
                  key={virtualRow.index}
                  {...componentProps.trBody?.({ row, virtualRow })}
                  // Custom row click handler
                  onClick={() => {
                    console.log(`Row clicked: "${row.id}"`);
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      // ~ Data cell
                      <td
                        key={cell.id}
                        {...componentProps.td?.({ cell, virtualRow })}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
