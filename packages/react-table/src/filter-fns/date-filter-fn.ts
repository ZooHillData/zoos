import { type Row } from "@tanstack/react-table";

type DateFilterValue = {
  from: string | undefined;
  to: string | undefined;
};

function dateFilterFn<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: DateFilterValue,
) {
  const { from, to } = {
    from: filterValue.from ? new Date(filterValue.from) : undefined,
    to: filterValue.to ? new Date(filterValue.to) : undefined,
  };
  const cellValue = row.getValue(columnId) as string;

  // If no filter is set, return true
  if (!from && !to) return true;

  const cellDate = new Date(cellValue);

  if (from && to) {
    return cellDate >= from && cellDate <= to;
  }

  if (from) {
    return cellDate >= from;
  }

  if (to) {
    const end = new Date(to);
    return cellDate <= to;
  }

  return true;
}

export { dateFilterFn, type DateFilterValue };
