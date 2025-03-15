import type { Row, HeaderContext } from "@tanstack/react-table";
import type { NumberRange2InputProps, NumberRange } from "@zoos/react-form";

import { NumberRange2Input } from "@zoos/react-form";

import { evaluateRangeFilter } from "../filter/lib/evaluate-range-filter";

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
  const {
    headerContext: { column },
  } = props;
  const filterValue = column.getFilterValue() as NumberRange;
  const minMax = column.getFacetedMinMaxValues();
  const range = {
    from: minMax?.[0] || filterValue?.from,
    to: minMax?.[1] || filterValue?.to,
  } as NumberRange;

  return (
    <NumberRange2Input
      value={range}
      onChange={(value) => {
        column.setFilterValue(value);
      }}
      {...props.inputProps}
    />
  );
};

export { filterFn, FilterInput };
