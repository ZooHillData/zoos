import React from "react";

import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type TableState,
  getGroupedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";

import { getControlledTableOptions } from "./get-controlled-table-options";
import { type TableOptionsControlled } from "./types";
import { globalFilterFn } from "../../lib/filter-fns/global-filter-fn";

const useControlledTable = <TData>({
  state,
  onStateChange,
  filterFns,
  ...options
}: TableOptionsControlled<TData>) => {
  // ~ useReactTable
  // The core react-table hook call which sets up:
  // - Row models
  // - controlled state handlers
  // - filter functions
  const table = useReactTable<TData>({
    // Core row models
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // Column resizing
    columnResizeMode: "onChange",
    // Filtering from the leaf nodes in the event of
    // hierarchical data, requiring expansion
    filterFromLeafRows: true,
    // Don't reset all state when data changes
    // for example, this will prevent the
    // expanding state from changing with global
    // filter or column filter changes
    autoResetAll: false,
    globalFilterFn,
    // Controlled state
    ...getControlledTableOptions({ state, onStateChange }),
    // Caller options
    ...options,
  });

  // ~ Controlled state updates table state
  // When controlled state changes, update in the table
  // state. Need this separated so that we can treat the
  // column sizing separately
  React.useEffect(() => {
    table.setState((prevState: TableState) => {
      return { ...prevState, ...state };
    });
  }, [state, table]);

  // ~ only fire `onStateChange` when column resize event stops
  // Because column sizing events fire continuously while resizing by draggging,
  // we only call the `onStateChange` handler when the resizing operation stops.
  const { columnSizingInfo } = table.getState(); // Get current sizing info
  const resizeColumnId = React.useRef<string | undefined>(); // Keep track of the id of the column being resized
  React.useEffect(() => {
    // When stop resizing, call the onChange handler
    if (!columnSizingInfo.isResizingColumn && resizeColumnId.current) {
      const resizeColumnIdStr = resizeColumnId.current as string;

      // Call the onStateChange handler
      onStateChange?.({
        ...table.getState(),
        columnSizing: {
          ...state?.columnSizing,
          [resizeColumnIdStr]: table.getState().columnSizing[resizeColumnIdStr],
        },
      });

      resizeColumnId.current = undefined;
    }
    // When start resizing, capture the column id of the resizing column
    if (columnSizingInfo.isResizingColumn && !resizeColumnId.current) {
      resizeColumnId.current = columnSizingInfo.columnSizingStart?.[0][0];
    }
  }, [
    columnSizingInfo.isResizingColumn,
    columnSizingInfo.columnSizingStart, // contains column ID of resizing column
    table,
    onStateChange,
    state,
  ]);

  return { table };
};

export { useControlledTable };
