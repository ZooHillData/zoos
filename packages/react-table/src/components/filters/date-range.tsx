import type { Row, HeaderContext } from "@tanstack/react-table";
import { cn } from "@zoos/shadcn";
import {
  DateRange2Picker,
  type DateRange2PickerProps,
  type DateRange,
} from "@zoos/react-form";

const filterFn = <TData,>(
  row: Row<TData>,
  columnId: string,
  filterValue: DateRange,
) => {
  const { from, to } = {
    from: filterValue.from ? new Date(filterValue.from) : undefined,
    to: filterValue.to ? new Date(filterValue.to) : undefined,
  };
  const cellValue: Date = row.getValue(columnId);

  // If no filter is set, return true
  if (!from && !to) return true;

  if (from && to) {
    return cellValue >= from && cellValue <= to;
  }

  if (from) {
    return cellValue >= from;
  }

  if (to) {
    return cellValue <= to;
  }

  return true;
};

const FilterInput = <TData, TValue>({
  headerContext: { column },
  inputProps,
}: {
  headerContext: HeaderContext<TData, TValue>;
  inputProps?: DateRange2PickerProps;
}) => {
  const { from, to } = (column.getFilterValue() || {}) as DateRange;

  return (
    <DateRange2Picker
      value={{ from, to }}
      onChange={(value) => column.setFilterValue(value)}
      {...inputProps}
    />
  );
};

export { filterFn, FilterInput };
