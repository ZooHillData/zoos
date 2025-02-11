import { type Column } from "@tanstack/react-table";

import { cn, mergeStyleProps } from "@zoos/shadcn";
import type { ComponentProps } from "./types";

const getPinningAttributes = <TData, TValue>(
  column: Column<TData, TValue>,
) => ({
  isPinned: Boolean(column.getIsPinned()),
  isPinnedLeft: column.getIsPinned() === "left",
  isPinnedRight: column.getIsPinned() === "right",
  isFirstRight:
    Boolean(column.getIsPinned()) && column.getIsFirstColumn("right"),
  isLastLeft: Boolean(column.getIsPinned()) && column.getIsLastColumn("left"),
});

const getPinningStyles = <TData, TValue>(column: Column<TData, TValue>) => {
  const pinning = getPinningAttributes(column);

  return {
    position: pinning.isPinned ? ("sticky" as const) : undefined,
    zIndex: pinning.isPinned ? 10 : undefined,
    left: pinning.isPinnedLeft ? `${column.getStart("left")}px` : undefined,
    right: pinning.isPinnedRight ? `${column.getAfter("right")}px` : undefined,
  };
};

const columnPinning = <TData, TValue>(params?: {
  custom?: Pick<ComponentProps<TData, TValue>, "th" | "td">;
}) =>
  ({
    th: ({ headerContext }) => {
      return mergeStyleProps([
        {
          style: getPinningStyles(headerContext.header.column),
        },
        params?.custom?.th?.({ headerContext }) || {},
      ]);
    },
    td: ({ cellContext: { cell }, virtualRow }) => {
      return mergeStyleProps([
        {
          style: getPinningStyles(cell.column),
        },
        params?.custom?.td?.({ cellContext: cell.getContext(), virtualRow }) ||
          {},
      ]);
    },
  }) satisfies ComponentProps<TData, TValue>;

export { columnPinning, getPinningStyles, getPinningAttributes };
