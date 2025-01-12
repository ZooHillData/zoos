import { type ComponentProps } from "./types";
import { type Virtualizer } from "@tanstack/react-virtual";

const rowVirtualization = <TData, TValue>(params: {
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
}) =>
  ({
    container: {
      ref: params.scrollContainerRef,
      className: "relative h-full max-h-fit max-w-fit overflow-auto",
    },
    table: {
      className: "grid w-full",
    },
    trHead: () => ({
      className: "flex w-full",
    }),
    th: ({ headerContext }) => ({
      style: {
        width: headerContext.header.getSize(),
      },
    }),
    tbody: { style: { height: `${params.rowVirtualizer.getTotalSize()}px` } },
    trBody: ({ row: _row, virtualRow }) => ({
      "data-index": virtualRow.index,
      ref: (node) => params.rowVirtualizer.measureElement(node),
      className: "absolute flex",
      style: {
        transform: `translateY(${virtualRow.start}px)`,
      },
    }),
    td: ({ cell }) => ({
      style: {
        width: cell.column.getSize(),
      },
    }),
  }) satisfies Partial<ComponentProps<TData, TValue>>;

export { rowVirtualization };
