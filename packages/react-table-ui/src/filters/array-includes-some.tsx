import React from "react";
import { type HeaderContext } from "@tanstack/react-table";

import { ComboboxCheckboxGroup } from "@zoos/react-form";

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

const filterFn = "arrIncludesSome";

export { FilterInput, filterFn };
