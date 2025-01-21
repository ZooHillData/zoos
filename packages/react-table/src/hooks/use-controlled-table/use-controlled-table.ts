import React from "react";

import { isDeepEqual } from "remeda";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";

import { getControlledStateHandlers } from "./get-controlled-state-handlers";
import { type TableOptionsControlled } from "./types";
import { globalFilterFn } from "../../lib/filter-fns/global-filter-fn";

const useControlledTable = <TData>({
  // We will not be passing columnSizing, columnSizingInfo into
  // useReactTable. Column sizing is handled differently
  // (doesn't fire `onStateChange` until resizing event ends)
  state: { columnSizing, columnSizingInfo, ...state } = {},
  onStateChange,
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
    // State does not include columnSizing and columnSizingInfo
    state,
    ...options,
  });

  // When external state columnSizing changes,
  // update the internal state to match
  // (only if the state is different)
  React.useEffect(() => {
    if (
      columnSizing &&
      !isDeepEqual(columnSizing, table.getState().columnSizing)
    ) {
      table.setColumnSizing(columnSizing);
    }
  }, [table, columnSizing]);

  // ~ Add the onChange handlers
  table.setOptions((prev) => ({
    ...prev,
    ...(onStateChange
      ? getControlledStateHandlers({ table, onStateChange })
      : {}),
  }));

  // ~ only fire `onStateChange` when column resize event stops
  // Because column sizing events fire continuously while resizing by draggging,
  // we only call the `onStateChange` handler when the resizing operation stops.
  const tableState = table.getState(); // Get current sizing info
  const resizeColumnId = React.useRef<string | undefined>(); // Keep track of the id of the column being resized
  React.useEffect(() => {
    const { columnSizingInfo } = tableState;

    // When stop resizing, call the onChange handler
    if (!columnSizingInfo.isResizingColumn && resizeColumnId.current) {
      const resizeColumnIdStr = resizeColumnId.current as string;

      // Call the onStateChange handler
      onStateChange?.({
        ...tableState,
        columnSizing: {
          ...tableState.columnSizing,
          [resizeColumnIdStr]: table.getState().columnSizing[resizeColumnIdStr],
        },
      });

      resizeColumnId.current = undefined;
    }
    // When start resizing, capture the column id of the resizing column
    if (columnSizingInfo.isResizingColumn && !resizeColumnId.current) {
      resizeColumnId.current = columnSizingInfo.columnSizingStart?.[0][0];
    }
  }, [table, onStateChange, tableState]);

  return { table };
};

export { useControlledTable };
