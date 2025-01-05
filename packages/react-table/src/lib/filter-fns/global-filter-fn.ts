import { type Row } from "@tanstack/react-table";

function globalFilterFn<TData>(
  row: Row<TData>,
  columnIds: string[],
  filterValue: string,
) {
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
