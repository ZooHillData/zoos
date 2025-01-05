import type {
  FilterFns,
  FilterFn,
  TableState,
  TableOptions,
} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface FilterFns {
    date: FilterFn<string>;
    number: FilterFn<number>;
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
  // Filter functions can be overridden partially
  | "filterFns"
> & {
  state: TableState;
  onStateChange: (state: TableState) => void;
  filterFns?: Partial<FilterFns>;
  inferTypes?: boolean;
};

export { type TableOptionsControlled };
