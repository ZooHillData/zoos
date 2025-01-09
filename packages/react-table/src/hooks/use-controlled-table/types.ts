import type {
  TableState,
  TableOptions,
  RowData,
  HeaderContext,
} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    // Column meta can be extended with custom properties
    Filter?: (headerContext: HeaderContext<TData, TValue>) => React.ReactNode;
  }
}

type TableOptionsControlled<TData> = Omit<
  TableOptions<TData>,
  // In controlled table, state / onStateChange require full table
  // state for simplicity
  | "state"
  | "onStateChange"
  // Row models that are already set
  | "getExpandedRowModel"
  | "getFacetedRowModel"
  | "getFilteredRowModel"
  | "getSortedRowModel"
  | "getCoreRowModel"
  | "getGroupedRowModel"
  // onChange handlers that are dealt with
  | "onColumnOrderChange"
  | "onColumnPinningChange"
  | "onColumnSizingChange"
  | "onColumnSizingInfoChange"
  | "onColumnVisibilityChange"
  | "onColumnFiltersChange"
  | "onGlobalFilterChange"
  | "onGroupingChange"
  | "onExpandedChange"
  | "onPaginationChange"
  | "onRowPinningChange"
  | "onRowSelectionChange"
  | "onSortingChange"
> & {
  state: TableState;
  onStateChange: (state: TableState) => void;
  inferTypes?: boolean;
};

export { type TableOptionsControlled };
