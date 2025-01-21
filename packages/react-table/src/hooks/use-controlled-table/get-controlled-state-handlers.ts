/**
 * Controlled table wires up state callbacks onto React Table
 * This hook will deal with performance considerations -- e.g.
 * for rapidly changing state (like column sizing), we will
 * only fire the callback when column sizing stops (user stops dragging).
 */

import type { TableState, TableOptions, Table } from "@tanstack/react-table";

/**
 * Helper function to wire in the controlled state options. Specifically
 * leaves out fast changing state like column sizing.
 *
 * @param state - Controlled table state
 * @param onStateChange - Callback to update controlled state
 * @returns Tanstack `TableOptions` for the controlled state.
 */
const getControlledStateHandlers = <TData>(props: {
  table: Table<TData>;
  onStateChange: (state: TableState) => void;
}) => {
  const { table, onStateChange } = props;
  const state = table.getState();

  const controlledStateOptions: Partial<TableOptions<TData>> = {
    onColumnOrderChange: (updater) => {
      const updated =
        updater instanceof Function ? updater(state.columnOrder) : updater;
      onStateChange({ ...state, columnOrder: updated });
    },
    onColumnPinningChange: (updater) => {
      const updated =
        updater instanceof Function ? updater(state.columnPinning) : updater;
      onStateChange({ ...state, columnPinning: updated });
    },
    onColumnVisibilityChange: (updater) => {
      const updated =
        updater instanceof Function ? updater(state.columnVisibility) : updater;
      onStateChange({ ...state, columnVisibility: updated });
    },
    onColumnFiltersChange: (updater) => {
      const updated =
        updater instanceof Function ? updater(state.columnFilters) : updater;
      onStateChange({ ...state, columnFilters: updated });
    },
    onGlobalFilterChange: (updater) => {
      const updated =
        updater instanceof Function ? updater(state.globalFilter) : updater;
      onStateChange({ ...state, globalFilter: updated });
    },
    onGroupingChange: (updater) => {
      const updated =
        updater instanceof Function ? updater(state.grouping) : updater;
      onStateChange({ ...state, grouping: updated });
    },
    onExpandedChange: (updater) => {
      const updated =
        updater instanceof Function ? updater(state.expanded) : updater;
      onStateChange({ ...state, expanded: updated });
    },
    onPaginationChange: (updater) => {
      const updated =
        updater instanceof Function ? updater(state.pagination) : updater;
      onStateChange({ ...state, pagination: updated });
    },
    onRowPinningChange: (updater) => {
      const updated =
        updater instanceof Function ? updater(state.rowPinning) : updater;
      onStateChange({ ...state, rowPinning: updated });
    },
    onRowSelectionChange: (updater) => {
      const updated =
        updater instanceof Function ? updater(state.rowSelection) : updater;
      onStateChange({ ...state, rowSelection: updated });
    },
    onSortingChange: (updater) => {
      console.log({ updater });
      const updated =
        updater instanceof Function ? updater(state.sorting) : updater;
      console.log({ updated });
      onStateChange({ ...state, sorting: updated });
    },
  };

  return controlledStateOptions;
};

export { getControlledStateHandlers };
