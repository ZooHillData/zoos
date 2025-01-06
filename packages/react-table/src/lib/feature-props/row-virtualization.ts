import { type ComponentProps } from "./types";
import { mergeFeatureProps } from "./merge-feature-props";
import { type Virtualizer } from "@tanstack/react-virtual";

const rowVirtualization = (params: {
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
}) =>
  ({
    container: {
      ref: params.scrollContainerRef,
      className: "relative h-fit max-h-full max-w-fit overflow-auto",
    },
    table: {
      className: "grid w-full",
    },
    trHead: () => ({
      className: "flex w-full",
    }),
    th: ({ header }) => ({
      style: {
        width: header.getSize(),
      },
    }),
    tbody: { style: { height: `${params.rowVirtualizer.getTotalSize()}px` } },
    trBody: ({ row, virtualRow }) => ({
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
  }) satisfies Partial<ComponentProps>;

export { rowVirtualization };
