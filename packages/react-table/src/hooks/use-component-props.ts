import React from "react";

import * as R from "remeda";

import type { Table, TableState } from "@tanstack/react-table";
import type { SubcomponentProps } from "../types";
import { Virtualizer } from "@tanstack/react-virtual";

const useComponentProps = <TData>({
  table,
  rowVirtualizer,
  features = {},
}: {
  table: Table<TData>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  features?: Partial<{ stickyHeader: boolean; resizeColumnNoSelect: boolean }>;
}) => {
  const tableState = table.getState();

  return React.useMemo(() => {
    const {
      columnSizingInfo: { isResizingColumn },
    } = tableState;

    const defaultComponentProps: SubcomponentProps<TData> = {
      container: {
        style: {
          position: "relative",
          height: "fit-content",
          maxHeight: "100%",
          maxWidth: "fit-content",
          overflow: "auto",
        },
      },
      table: {
        style: {
          display: "grid",
          width: "100%",
          userSelect:
            features.resizeColumnNoSelect && isResizingColumn
              ? "none"
              : undefined,
        },
      },
      thead: {
        style: features.stickyHeader
          ? {
              top: 0,
              position: "sticky",
              zIndex: 10,
              background: "var(--background)",
            }
          : {},
      },

      thead_tr: () => ({ style: { display: "flex", width: "100%" } }),
      th: ({ header }) => ({
        style: {
          display: "flex",
          left: header.getStart(),
          width: header.getSize(),
        },
      }),
      tbody: { style: { height: `${rowVirtualizer.getTotalSize()}px` } },
      tbody_tr: ({ row, virtualRow }) => ({
        "data-index": virtualRow.index,
        ref: (node) => rowVirtualizer.measureElement(node),
        style: {
          position: "absolute",
          display: "flex",
          transform: `translateY(${virtualRow.start}px)`,
        },
      }),
      td: ({ cell }) => ({
        style: {
          width: cell.column.getSize(),
        },
      }),
    };

    return defaultComponentProps;
  }, [tableState, rowVirtualizer, features]);
};

export { useComponentProps };
