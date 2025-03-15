import type { Row, HeaderContext } from "@tanstack/react-table";
import type { NumberRange2InputProps, NumberRange } from "@zoos/react-form";

import React from "react";

import { NumberRange2Input } from "@zoos/react-form";
import { useReactiveState } from "@zoos/shadcn";

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
  debounceDelay?: number;
}) => {
  const {
    headerContext: { column },
    debounceDelay,
  } = props;
  const filterValue = column.getFilterValue() as NumberRange;
  const [value, setValue] = useReactiveState(filterValue);

  React.useEffect(() => {
    if (!debounceDelay) {
      column.setFilterValue(value);
      return;
    }
    // If there is a debounce delay passed, we will wait to update
    // the filter in the table until the alotted time has passed
    const timeout = setTimeout(() => {
      column.setFilterValue(value);
    }, debounceDelay);

    return () => clearTimeout(timeout);
  }, [value, debounceDelay, column]);

  return (
    <NumberRange2Input
      value={value}
      onChange={(value) => {
        setValue(value);
      }}
      {...props.inputProps}
    />
  );
};

export { filterFn, FilterInput };
