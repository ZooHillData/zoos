import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/react-table/standard")({
  component: RouteComponent,
});

import React from "react";

import {
  type TableState,
  type HeaderContext,
  flexRender,
} from "@tanstack/react-table";
import {
  useControlledTable,
  useVirtualization,
  FormattedId,
  HeaderContextMenu,
  HeaderSortIndicator,
  featureProps,
  mergeFeatureProps,
  // getColumns,
  getPinningAttributes,
  filters,
  ClearFilterButton,
} from "@zoos/react-table";
import {
  Label,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
  cn,
} from "@zoos/shadcn";

/*
~ 
~ Components for Filter UI
~ 

*/

/**
 * Container around the filter
 * `<FilterContainer><Label /><FilterInput /></FilterContainer>`
 */
const FilterContainer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-1 px-2 py-1", className)} {...props} />
);

/** Style and format the column ID for display in the filter component */
const FilterFieldLabel = ({
  className,
  headerContext,
}: {
  headerContext: HeaderContext<User, unknown>;
  className?: string;
}) => (
  <em className={cn("italic", className)}>
    <FormattedId headerContext={headerContext} />
  </em>
);

// ~ Manual column definitions
// Using `getColumns` to infer all columns
import { type User } from "../../lib/fake-data";
import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper<User>();
const columns = [
  columnHelper.group({
    header: "User",
    columns: [
      columnHelper.accessor("first_name", {}),
      columnHelper.accessor("last_name", {}),
      columnHelper.accessor("age", {}),
    ],
  }),
  columnHelper.accessor("join_date", {
    filterFn: filters.date.range.filterFn,
    meta: {
      filter: (headerContext) => (
        <FilterContainer>
          <Label>
            <FilterFieldLabel headerContext={headerContext} /> Range
          </Label>
          <filters.date.range.FilterInput headerContext={headerContext} />
          <ClearFilterButton headerContext={headerContext} />
        </FilterContainer>
      ),
    },
  }),
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
        <FilterContainer>
          <Label>
            <FilterFieldLabel headerContext={headerContext} /> is in:
          </Label>
          <filters.string.inArray.FilterInput
            headerContext={headerContext}
            inputProps={{
              className: "max-h-[400px] overflow-auto",
              // Full control over props passed to input
              // (other than those required to connect to
              // `headerContext.column.setFilterValue()`)
              options: Array.from(
                headerContext.column.getFacetedUniqueValues().keys(),
              ).sort((a, b) => a.localeCompare(b)),
            }}
          />
          <ClearFilterButton headerContext={headerContext} />
        </FilterContainer>
      ),
    },
  }),
  columnHelper.accessor("zip", {}),
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
            <FilterContainer>
              <Label>
                <FilterFieldLabel headerContext={headerContext} /> matches:
              </Label>
              <filters.string.includes.FilterInput
                headerContext={headerContext}
                inputProps={{ placeholder: "case insensitive match" }}
              />
              <ClearFilterButton headerContext={headerContext} />
            </FilterContainer>
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
                  ? "border-r-4"
                  : isFirstRight
                    ? "border-l-4"
                    : "",
              };
            },
            td: ({ cell: { column } }) => {
              const { isLastLeft, isFirstRight } = getPinningAttributes(column);
              return {
                className: isLastLeft
                  ? "border-r-4"
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
        // No overflow (important for pinned columns with higher z-index
        // to not overflow into other columns)
        {
          th: () => ({ className: "overflow-hidden" }),
          td: () => ({ className: "overflow-hidden" }),
        },
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
