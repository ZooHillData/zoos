import type {
  Column,
  Header,
  HeaderContext,
  Table,
} from "@tanstack/react-table";

const getHeaderContext = <TData>(
  table: Table<TData>,
  column: Column<TData, unknown>,
): HeaderContext<TData, unknown> => {
  return {
    column,
    header: column.columnDef.header as unknown as Header<TData, unknown>,
    table,
  };
};

export { getHeaderContext };
