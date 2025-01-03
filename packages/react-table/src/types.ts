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
import { type VirtualItem } from "@tanstack/react-virtual";

declare module "@tanstack/react-table" {
  interface FilterFns {
    date: FilterFn<string>;
    number: FilterFn<number>;
  }
}

/** Utility type for recursively defined deep partial on objects */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Props passed into the various table component, e.g.:
 * - `<table />`
 * - `<tbody />`
 * - `<tr />` (within `<thead />`)
 * - `<tr />` (within `<tbody />`),
 * - ..
 *
 * For components rendered within iterators, these are actually "prop getter" functions that receive the data from the relevant iteration step
 * (current row / column / cell) -- this can be used to apply for example, striping, e.g.:
 * ```tsx
 * const componentProps = getComponentProps({
 *  components: {
 *   tr: ({ row }) => ({
 *    className: row.index % 2 === 0 ? "bg-gray-100" : "",
 *  }),
 * });
 */
type SubcomponentProps<TData> = Partial<{
  container: { style: React.CSSProperties };
  table: { style: React.CSSProperties };
  // thead
  thead: { style: React.CSSProperties };
  thead_tr: (params: { headerGroup: HeaderGroup<TData> }) => {
    style: React.CSSProperties;
  };
  th: (params: { header: Header<TData, unknown> }) => {
    style: React.CSSProperties;
  };
  // tbody
  tbody: { style: React.CSSProperties };
  tbody_tr: (params: { row: Row<TData>; virtualRow: VirtualItem }) => {
    "data-index": number;
    ref: (node: HTMLTableRowElement) => void;
    style: React.CSSProperties;
  };
  td: (params: { cell: Cell<TData, unknown> }) => {
    style: React.CSSProperties;
  };
}>;
/**
 * Passed to the base hook: `useControlledTable`
 *
 * This type omits many of the standard on-state change options (e.g. `onColumnVisibilityChange`) to `useReactTable`.
 * These options are wired together into a single optimized `state` / `onStateChange` endpoint.
 *
 * (optimizations include: only calling `onColumnSizingChange` when sizing stops to prevent extremely rapid rerenders)
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

export type {
  SubcomponentProps,
  TableOptionsControlled,
  TableOptionsInferred,
  DeepPartial,
};
