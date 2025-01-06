import { type Row } from "@tanstack/react-table";

type NumRangeFilterValue = [number | undefined, number | undefined];

function numRangeFilterFn<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: NumRangeFilterValue,
) {
  const [from, to] = filterValue;
  const cellValue = row.getValue<number>(columnId);

  // Handle undefined or null cell values (e.g., if the cell is empty)
  if (cellValue === null || cellValue === undefined) {
    return false;
  }

  // If no filter is set, return true (i.e., show all rows)
  if (from === undefined && to === undefined) {
    return true;
  }

  // Check if the cell value is within the range
  if (from !== undefined && to !== undefined) {
    return cellValue >= from && cellValue <= to;
  }

  if (from !== undefined) {
    return cellValue >= from;
  }

  if (to !== undefined) {
    return cellValue <= to;
  }

  return true;
}

export { numRangeFilterFn, type NumRangeFilterValue };
