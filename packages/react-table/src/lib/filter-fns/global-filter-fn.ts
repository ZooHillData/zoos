import { type Row } from "@tanstack/react-table";

function globalFilterFn<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: string,
) {
  const columnIds = row.getAllCells().map((cell) => cell.column.id);
  const lowerFilter = filterValue.toLowerCase();
  const concatenatedValues = columnIds
    .map((columnId) => {
      const value = row.getValue(columnId);
      return value ? String(value).toLowerCase() : "";
    })
    .join(" ");
  return concatenatedValues.includes(lowerFilter);
}

export { globalFilterFn };
