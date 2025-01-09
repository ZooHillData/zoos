import { Input } from "@zoos/shadcn";

import { type HeaderContext } from "@tanstack/react-table";

const FilterInput = <TData, TValue>({
  headerContext: { column },
  inputProps,
}: {
  headerContext: HeaderContext<TData, TValue>;
  inputProps?: Omit<React.ComponentProps<typeof Input>, "value" | "onChange">;
}) => {
  const filterValue = String(column.getFilterValue() || "");

  return (
    <Input
      value={filterValue}
      onChange={(e) => column.setFilterValue(e.target.value)}
      {...inputProps}
    />
  );
};

const filterFn = "includesString";

export { FilterInput, filterFn };
