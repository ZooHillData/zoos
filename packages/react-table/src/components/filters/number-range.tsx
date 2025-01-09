import type { Row, HeaderContext } from "@tanstack/react-table";
import {
  NumberRange2Input,
  type NumberRange2InputProps,
  type NumberRange,
} from "@zoos/react-form";

import { evaluateRangeFilter } from "./lib";

function filterFn<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue?: NumberRange,
) {
  const { from, to } = filterValue || {};
  const value: number = row.getValue(columnId);

  return evaluateRangeFilter({ from, to, value });
}

const FilterInput = <TData, TValue>(props: {
  headerContext: HeaderContext<TData, TValue>;
  inputProps?: NumberRange2InputProps;
}) => {
  const { column } = props.headerContext;
  const { from, to } = (column.getFilterValue() || {}) as NumberRange;

  return (
    <NumberRange2Input
      value={{ from, to }}
      onChange={(value) => column.setFilterValue(value)}
      {...props.inputProps}
    />
  );
};

export { filterFn, FilterInput };
