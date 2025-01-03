import React from "react";

import * as R from "remeda";

import type { Table, TableState } from "@tanstack/react-table";
import type { SubcomponentProps } from "../types";

const useComponentProps = <TData>({
  table,
  getComponentProps,
}: {
  table: Table<TData>;
  getComponentProps?: (tableState: TableState) => SubcomponentProps<TData>;
}): SubcomponentProps<TData> => {
  const tableState = table.getState();

  return React.useMemo(() => {
    const {
      columnSizingInfo: { isResizingColumn },
    } = tableState;

    const defaultComponentProps: SubcomponentProps<TData> = {
      container: {
        className: "relative h-fit max-h-full max-w-fit overflow-auto",
      },
      table: {
        className: isResizingColumn ? "grid w-full select-none" : "grid w-full",
      },
      thead: { className: "bg-background sticky top-0 z-10" },
      thead_tr: () => ({ className: "flex w-full" }),
      th: ({ header }) => ({
        className: "flex",
        style: {
          left: header.getStart(),
          width: header.getSize(),
        },
      }),
      tbody: {},
      tbody_tr: ({ row, virtualRow }) => ({
        className: "absolute flex",
        style: { transform: `translateY(${virtualRow.start}px)` },
        onClick: () => {
          console.log({ row });
        },
      }),
      td: ({ cell }) => ({
        className: "",
        style: {
          width: cell.column.getSize(),
        },
      }),
    };

    const userOverrides = getComponentProps?.(tableState);
    if (userOverrides) {
      return R.mergeDeep(defaultComponentProps)(
        userOverrides,
      ) as SubcomponentProps<TData>;
    }
    return defaultComponentProps;
  }, [tableState, getComponentProps]);
};

export { useComponentProps };
