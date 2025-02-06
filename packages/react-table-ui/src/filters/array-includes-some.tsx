import { type HeaderContext, type Row } from "@tanstack/react-table";

import { createCn, Input } from "@zoos/shadcn";
import { CheckboxGroupVirtual, useVirtualCombobox } from "@zoos/react-form";
import React from "react";

const Combobox = ({
  options,
  inputClassName,
  ...props
}: Omit<React.ComponentProps<typeof CheckboxGroupVirtual>, "virtualizer"> & {
  inputClassName?: string;
}) => {
  const {
    query,
    setQuery,
    optionsFiltered,
    hasUniqueValues,
    virtualizer,
    scrollRef,
  } = useVirtualCombobox({
    options,
    virtualizerOptions: { estimateSize: () => 24 },
  });

  if (!hasUniqueValues) {
    window.alert(
      "Options must have unique values. That's one benefit of `Options` as an object with IDs.",
    );
  }

  return (
    <div className="space-y-3">
      <Input
        className={inputClassName}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="h-full overflow-auto" ref={scrollRef}>
        <CheckboxGroupVirtual
          options={optionsFiltered}
          virtualizer={virtualizer}
          className={createCn("flex flex-col gap-3")}
          {...props}
        />
      </div>
    </div>
  );
};

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
