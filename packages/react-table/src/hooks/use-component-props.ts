import React from "react";

import type { Table } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";
import type { ComponentProps } from "../lib/feature-props";

import {
  getPinningAttributes,
  mergeFeatureProps,
  featureProps,
} from "../lib/feature-props";

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
        td: ({ cellContext: { cell } }) => {
          const { isLastLeft, isFirstRight } = getPinningAttributes(
            cell.column,
          );
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
    table: Table<TData>;
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

export { getComponentProps, useComponentProps };
