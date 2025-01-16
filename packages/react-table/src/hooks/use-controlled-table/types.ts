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

type TableOptionsControlled<TData extends RowData> = Omit<
  TableOptions<TData>,
  // Row models that are already set
  | "onStateChange"
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
  onStateChange?: (state: TableState) => void;
};

export { type TableOptionsControlled };
