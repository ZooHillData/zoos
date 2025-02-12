import { type HeaderContext, type Row } from "@tanstack/react-table";

import { ComboboxCheckboxGroup } from "@zoos/react-form";
import React from "react";

const FilterInput = <TData, TValue>({
  headerContext: { column },
  inputProps,
}: {
  headerContext: HeaderContext<TData, TValue>;
  inputProps: Omit<
    React.ComponentProps<typeof ComboboxCheckboxGroup>,
    "value" | "onClick"
  >;
}) => {
  const filterValue = (column.getFilterValue() || []) as string[];

  return (
    <ComboboxCheckboxGroup
      {...inputProps}
      value={filterValue}
      onChange={(value) => column.setFilterValue(value)}
    />
  );
};

const filterFn = <TData,>(
  row: Row<TData>,
  columnId: string,
  filterValue: string[] | undefined,
  addMeta: (meta: any) => void,
) => {
  // Empty filter value means no filter set
  if (!filterValue || filterValue.length === 0) return true;

  const value = row.getValue<string>(columnId);
  return filterValue.includes(value);
};

export { FilterInput, filterFn };
