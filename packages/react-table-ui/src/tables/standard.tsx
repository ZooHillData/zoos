import React from "react";

import {
  flexRender,
  type Table as TTable,
  type Header,
  type Cell,
} from "@tanstack/react-table";
import { type Virtualizer } from "@tanstack/react-virtual";

import {
  useVirtualization,
  useControlledTable,
  featureProps,
  mergeFeatureProps,
  getPinningAttributes,
  type ComponentProps,
} from "@zoos/react-table";

import { HeaderContextMenu, HeaderSortIndicator } from "../header";

type UseTableParams<TData> = Parameters<typeof useControlledTable<TData>>[0] & {
  virtualOptions?: Partial<
    Omit<Parameters<typeof useVirtualization>[0], "table">
  >;
};

const useTable = <TData extends object>({
  virtualOptions = {},
  ...tableOptions
}: UseTableParams<TData> &
  Partial<Omit<Parameters<typeof useVirtualization>[0], "table">>) => {
  const { table } = useControlledTable(tableOptions);

  const {
    row = { estimateSize: () => 24, overscan: 50 },
    column = { overscan: 3 },
  } = virtualOptions;

  const virtualizer = useVirtualization({
    table,
    row,
    column,
  });

  return {
    table,
    ...virtualizer,
  };
};

const Table = <TData extends object, TValue>(props: {
  table: TTable<TData>;
  virtualRows: ReturnType<typeof useVirtualization>["virtualRows"];
  componentProps: ComponentProps<TData, TValue>;
}) => {
  const { table, virtualRows, componentProps } = props;

  return (
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
              {headerGroup.headers.map((header: Header<TData, TValue>) => {
                return (
                  // ~ Header cell
                  <th
                    key={header.id}
                    {...componentProps.th?.({
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
              >
                {
                  // ! Need this type hint to avoid TS error
                  row.getVisibleCells().map((cell: Cell<TData, TValue>) => {
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

const getComponentProps = <TData, TValue>({
  isResizingColumn,
  rowVirtualizer,
  scrollContainerRef,
  mergeProps = [],
}: {
  isResizingColumn: boolean;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  mergeProps?: Partial<ComponentProps<TData, TValue>>[];
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
    ...mergeProps,
  ]);

const useComponentProps = <TData, TValue>(
  params: {
    table: TTable<TData>;
    rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  },
  custom?: { mergeProps?: Partial<ComponentProps<NoInfer<TData>, TValue>>[] },
): ComponentProps<TData, TValue> => {
  const { table, rowVirtualizer, scrollContainerRef } = params;
  const { mergeProps } = custom || {};

  const isResizingColumn = !!table.getState().columnSizingInfo.isResizingColumn;
  return React.useMemo(
    () =>
      getComponentProps({
        isResizingColumn,
        rowVirtualizer,
        scrollContainerRef,
        mergeProps,
      }),
    [isResizingColumn, rowVirtualizer, scrollContainerRef, mergeProps],
  );
};

export { Table, useTable, useComponentProps, getComponentProps };
