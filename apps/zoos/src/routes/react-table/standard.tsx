import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/react-table/standard")({
  component: RouteComponent,
});

import React from "react";

import { type TableState, flexRender } from "@tanstack/react-table";
import {
  useControlledTable,
  useVirtualization,
  FormattedId,
  HeaderContextMenu,
  HeaderSortIndicator,
  featureProps,
  mergeFeatureProps,
  getColumns,
  getPinningAttributes,
  filters,
} from "@zoos/react-table";
import {
  Label,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@zoos/shadcn";

// ~ Manual column definitions
// Using `getColumns` to infer all columns
import { type User } from "../../lib/fake-data";
import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper<User>();
const columns = [
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
      columnHelper.accessor("street", {
        // ~ Custom cell (tooltip for previewing long text)
        // This does have performance impacts, so recommend
        // using on a per-column basis instead of setting in `defaultColumn`
        cell: (cellContext) => (
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              {/* 
              `className="w-full text-left"` 
                => makes sure alignment is still left but the tooltip takes up the full cell 
              */}
              <TooltipTrigger className="w-full text-left">
                {String(cellContext.getValue())}
              </TooltipTrigger>
              <TooltipContent>{String(cellContext.getValue())}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      }),
      columnHelper.accessor("city", {}),
      columnHelper.accessor("state", {
        // ~ Custom filter
        // specify:
        // - `filterFn` (method)
        // - `meta.filter` (rendered Component)
        // - since this is a `inArray` filter, provide `options` prop to the `input`
        filterFn: filters.string.inArray.filterFn,
        meta: {
          filter: (headerContext) => (
            <filters.string.inArray.Filter
              headerContext={headerContext}
              inputProps={{
                // Full control over props passed to input
                // (other than those required to connect to
                // `headerContext.column.setFilterValue()`)
                options: Array.from(
                  headerContext.column.getFacetedUniqueValues().keys(),
                ).sort((a, b) => a.localeCompare(b)),
              }}
            />
          ),
        },
      }),
      columnHelper.accessor("zip", {}),
    ],
  }),
];

const getFullType = <T,>(partial: Partial<T>): T => {
  return partial as T;
};

function RouteComponent() {
  // Table state
  const [state, setState] = React.useState(
    getFullType<TableState>({
      columnVisibility: {
        first_name: true,
      },
    }),
  );

  // Data / inferred columns (no type inference yet)
  const { data } = Route.useRouteContext();
  // const columns = React.useMemo(() => getColumns({ data }), [data]);

  // Table with single state / onStateChange
  // plus a couple other goodies (filterFns)
  const { table } = useControlledTable({
    data,
    columns,
    defaultColumn: {
      header: (headerContext) => <FormattedId headerContext={headerContext} />,
      filterFn: filters.string.includes.filterFn,
      meta: {
        filter: (headerContext) => {
          return (
            <div className="flex flex-col gap-2">
              <Label className="pt-1">
                <FormattedId headerContext={headerContext} /> matches (case
                insensitive):
              </Label>
              <filters.string.includes.Filter
                headerContext={headerContext}
                inputProps={{ placeholder: "Filter value" }}
              />
            </div>
          );
        },
      },
    },
    state,
    onStateChange: (state) => setState(state),
  });

  // Row and column virtualization
  const { scrollContainerRef, rowVirtualizer, virtualRows } = useVirtualization(
    {
      table,
      row: {
        estimateSize: () => 24,
        overscan: 10,
      },
      column: {
        overscan: 3,
      },
    },
  );

  // Get component props leverage the feature props functions
  const isResizingColumn = !!table.getState().columnSizingInfo.isResizingColumn;
  const componentProps = React.useMemo(
    () =>
      mergeFeatureProps([
        // ~ Standard features
        featureProps.rowVirtualization({ scrollContainerRef, rowVirtualizer }),
        featureProps.stickyHeader({
          custom: { thead: { className: "bg-background" } },
        }),
        featureProps.resizeColumn({
          isResizingColumn,
          custom: {
            resizeColHandle: () => ({
              className: "bg-primary",
            }),
          },
        }),
        featureProps.borders(),
        featureProps.columnPinning({
          custom: {
            // Custom styles for the border between pinned and non-pinned columns
            // `<td />` and `<th />` set separately
            th: ({ header: { column } }) => {
              const { isLastLeft, isFirstRight } = getPinningAttributes(column);
              return {
                className: isLastLeft
                  ? "border-r-4 border-red-500"
                  : isFirstRight
                    ? "border-l-4"
                    : "",
              };
            },
            td: ({ cell: { column } }) => {
              const { isLastLeft, isFirstRight } = getPinningAttributes(column);
              return {
                className: isLastLeft
                  ? "border-r-4 border-red-500"
                  : isFirstRight
                    ? "border-l-4"
                    : "",
              };
            },
          },
        }),
        // ~ User-defined styles
        // Small text
        { container: { className: "text-sm" } },
        // No wrapping in table cells
        { td: () => ({ className: "whitespace-nowrap" }) },
        // Header cell and data Padding
        {
          th: () => ({ className: "px-1 py-0.5" }),
          td: () => ({ className: "px-1 py-0.5" }),
        },
        // Row striping
        {
          td: ({ virtualRow }) => ({
            className:
              virtualRow.index % 2 === 0 ? "bg-accent" : "bg-background",
          }),
          th: () => ({ className: "bg-background" }),
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
              <tr
                key={headerGroup.id}
                {...componentProps.trHead?.({ headerGroup })}
              >
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
                        {...componentProps.resizeColHandle?.({
                          headerContext: header.getContext(),
                        })}
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
                    console.log("Row clicked:", { row });
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
