/**
 * This is an example API for a fully custom table component that can be re-used easily.
 *
 * This is the standard Zoos table hooks, components, feature props, etc..
 */
import React from "react";

import {
  flexRender,
  type Table as TTable,
  type HeaderContext,
  Header,
} from "@tanstack/react-table";
import { type Virtualizer } from "@tanstack/react-virtual";

import { cn } from "@zoos/shadcn";
import {
  useVirtualization,
  useControlledTable,
  featureProps,
  mergeFeatureProps,
  getPinningAttributes,
  FormattedId,
  HeaderContextMenu,
  HeaderSortIndicator,
  ComponentProps,
} from "@zoos/react-table";

const FilterContainer = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1 px-2 py-1", className)} {...props}>
    {children}
  </div>
);

const FilterFieldLabel = <TData, TValue>({
  className,
  headerContext,
}: {
  headerContext: HeaderContext<TData, TValue>;
  className?: string;
}) => (
  <em className={cn("italic", className)}>
    <FormattedId headerContext={headerContext} />
  </em>
);

type UseTableParams<TData, TValue> = Parameters<
  typeof useControlledTable<TData>
>[0] & {
  userProps?: Partial<ComponentProps<TData, TValue>>;
};

const useTable = <TData extends object, TValue>({
  columns,
  data,
  userProps = {},
  ...params
}: UseTableParams<TData, TValue>) => {
  const { table } = useControlledTable({
    data,
    columns,
    ...params,
  });
  const { scrollContainerRef, rowVirtualizer, virtualRows } = useVirtualization(
    {
      table,
      row: {
        estimateSize: () => 24,
        overscan: 50,
      },
      column: {
        overscan: 3,
      },
    },
  );

  // Get component props leverage the feature props functions
  const isResizingColumn = !!table.getState().columnSizingInfo.isResizingColumn;
  const featureProps = React.useMemo(
    () =>
      getFeatureProps({
        isResizingColumn,
        rowVirtualizer,
        scrollContainerRef,
        userProps,
      }),
    [isResizingColumn, rowVirtualizer, scrollContainerRef, userProps],
  );

  return {
    table,
    scrollContainerRef,
    rowVirtualizer,
    virtualRows,
    featureProps,
  };
};

const Table = <TData extends object, TValue>(props: {
  table: TTable<TData>;
  virtualRows: ReturnType<typeof useVirtualization>["virtualRows"];
  featureProps: ComponentProps<TData, TValue>;
}) => {
  const { table, virtualRows, featureProps } = props;

  return (
    <div {...featureProps.container}>
      <table {...featureProps.table}>
        {
          // ~ THEAD
        }
        <thead {...featureProps.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            // ~ Header row
            <tr
              key={headerGroup.id}
              {...featureProps.trHead?.({ headerGroup })}
            >
              {headerGroup.headers.map((header: Header<TData, TValue>) => {
                return (
                  // ~ Header cell
                  <th
                    key={header.id}
                    {...featureProps.th?.({
                      headerContext: header.getContext(),
                    })}
                  >
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
                      {...featureProps.resizeColHandle?.({
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
        <tbody {...featureProps.tbody}>
          {virtualRows.map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              // ~ Data row
              <tr
                key={virtualRow.index}
                {...featureProps.trBody?.({ row, virtualRow })}
                // Custom row click handler
              >
                {
                  // ! Need this type hint to avoid TS error
                  row.getVisibleCells().map((cell) => {
                    return (
                      // ~ Data cell
                      <td
                        key={cell.id}
                        {...featureProps.td?.({ cell, virtualRow })}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const getFeatureProps = <TData, TValue>({
  isResizingColumn,
  rowVirtualizer,
  scrollContainerRef,
  userProps = {},
}: {
  isResizingColumn: boolean;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  userProps?: Partial<ComponentProps<TData, TValue>>;
}): ComponentProps<TData, TValue> =>
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
    // featureProps.borders(),
    featureProps.columnPinning({
      custom: {
        // Custom styles for the border between pinned and non-pinned columns
        // `<td />` and `<th />` set separately
        th: ({ headerContext: { column } }) => {
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
    { container: { className: "text-sm rounded" } },
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
        className: virtualRow.index % 2 === 0 ? "bg-muted" : "bg-background",
      }),
      th: () => ({ className: "bg-background" }),
    },
    userProps,
  ]);

export { useTable, FilterContainer, FilterFieldLabel, Table, getFeatureProps };
