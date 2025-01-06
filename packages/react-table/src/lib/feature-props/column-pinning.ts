import { type Column } from "@tanstack/react-table";

import { cn, mergeStyleProps } from "@zoos/ui-shad";
import type { ComponentProps } from "./types";

const getPinningAttributes = <TData>(column: Column<TData, unknown>) => ({
  isPinned: Boolean(column.getIsPinned()),
  isPinnedLeft: column.getIsPinned() === "left",
  isPinnedRight: column.getIsPinned() === "right",
  isFirstRight:
    Boolean(column.getIsPinned()) && column.getIsFirstColumn("right"),
  isLastLeft: Boolean(column.getIsPinned()) && column.getIsLastColumn("left"),
});

const getPinningStyles = <TData>(column: Column<TData, unknown>) => {
  const pinning = getPinningAttributes(column);

  return {
    position: pinning.isPinned ? ("sticky" as const) : ("relative" as const),
    zIndex: pinning.isPinned ? 10 : undefined,
    left: pinning.isPinnedLeft ? `${column.getStart("left")}px` : undefined,
    right: pinning.isPinnedRight ? `${column.getAfter("right")}px` : undefined,
  };
};

const columnPinning = (params?: {
  custom?: Pick<ComponentProps, "th" | "td">;
}) =>
  ({
    th: ({ header }) => {
      return mergeStyleProps([
        {
          style: getPinningStyles(header.column),
        },
        params?.custom?.th?.({ header }) || {},
      ]);
    },
    td: ({ cell, virtualRow }) => {
      return mergeStyleProps([
        {
          style: getPinningStyles(cell.column),
        },
        params?.custom?.td?.({ cell, virtualRow }) || {},
      ]);
    },
  }) satisfies Partial<ComponentProps>;

export { columnPinning, getPinningStyles, getPinningAttributes };
