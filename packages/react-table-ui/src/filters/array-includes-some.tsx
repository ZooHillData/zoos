import React from "react";
import { type HeaderContext } from "@tanstack/react-table";

import { Combobox } from "@zoos/react-form";

const FilterInput = <TData, TValue>({
  headerContext: { column },
  inputProps,
}: {
  headerContext: HeaderContext<TData, TValue>;
  inputProps: Omit<React.ComponentProps<typeof Combobox>, "value" | "onClick">;
}) => {
  const filterValue = (column.getFilterValue() || []) as string[];

  return (
    <Combobox
      {...inputProps}
      value={filterValue}
      onChange={(value) => column.setFilterValue(value)}
    />
  );
};

const filterFn = "arrIncludesSome";

export { FilterInput, filterFn };
