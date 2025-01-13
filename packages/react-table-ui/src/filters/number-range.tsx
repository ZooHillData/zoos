import React from "react";

import type { Row, HeaderContext } from "@tanstack/react-table";

import {
  NumberRange2Input,
  type NumberRange2InputProps,
  type NumberRange,
} from "@zoos/react-form";

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
  autoRefresh?: boolean;
}) => {
  const {
    headerContext: { column },
    autoRefresh = true,
  } = props;
  const filterValue = column.getFilterValue();
  const range = (filterValue || {}) as NumberRange;
  const [value, setValue] = React.useState(range);

  // When autoRefresh is re-enabled, set the value in the column
  React.useEffect(() => {
    if (autoRefresh) {
      column.setFilterValue(value);
    }
  }, [autoRefresh, column, value]);

  React.useEffect(() => {
    setValue(filterValue ? { ...filterValue } : {});
  }, [filterValue]);

  return (
    <NumberRange2Input
      value={value}
      onChange={(value) => {
        if (autoRefresh) {
          column.setFilterValue(value);
        } else {
          setValue(value);
        }
      }}
      {...props.inputProps}
    />
  );
};

export { filterFn, FilterInput };
