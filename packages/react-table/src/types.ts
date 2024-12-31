import type {
  Cell,
  ColumnDef,
  FilterFns,
  FilterFn,
  Header,
  HeaderGroup,
  Row,
  TableState,
  TableOptions,
} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface FilterFns {
    date: FilterFn<string>;
    number: FilterFn<number>;
  }
}

type SubcomponentProps<TData> = {
  container: React.ComponentProps<"div">;
  table: React.ComponentProps<"table">;
  head: {
    thead: React.ComponentProps<"thead">;
    tr: (params: {
      headerGroup: HeaderGroup<TData>;
    }) => React.ComponentProps<"tr">;
    th: (params: {
      header: Header<TData, unknown>;
    }) => React.ComponentProps<"th">;
  };
  body: {
    tbody: React.ComponentProps<"tbody">;
    tr: (params: { row: Row<TData> }) => React.ComponentProps<"tr">;
    td: (params: { cell: Cell<TData, unknown> }) => React.ComponentProps<"td">;
  };
};

/**
 * Passed to the base hook: `useControlledTable`
 *
 * The controlled table hook, `useControlledTable` takes care of:
 *   - enabling all features, e.g. column sizing, filtering, sorting
 *   - connecting `state` and `onStateChange` to the `onXXXChange` handlers
 *     (dealing with performance issues with column sizing for you)
 *   - adding custom filter functions, e.g. number range filter
 */
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

/** For `useInferredTable`, column definitions are inferred and therefore, optional */
type TableOptionsInferred<TData> = Omit<
  TableOptionsControlled<TData>,
  "columns"
> & {
  columns?: Partial<ColumnDef<TData, unknown>>[];
};

export type { SubcomponentProps, TableOptionsControlled, TableOptionsInferred };
