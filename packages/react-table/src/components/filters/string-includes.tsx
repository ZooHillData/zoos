import { Input } from "@zoos/shadcn";
import { InputDebounce } from "@zoos/react-form";

import { type HeaderContext } from "@tanstack/react-table";

type FilterInputProps<TData, TValue> = Omit<
  React.ComponentProps<typeof InputDebounce>,
  "value" | "onChange" | "delay"
> & {
  headerContext: HeaderContext<TData, TValue>;
  delay?: number;
};

const FilterInput = <TData, TValue>({
  headerContext: { column },
  delay = 0,
  ...inputProps
}: FilterInputProps<TData, TValue>) => {
  const filterValue = String(column.getFilterValue() || "");

  return (
    <InputDebounce
      value={filterValue}
      onChange={(value) => column.setFilterValue(value)}
      delay={delay}
      {...inputProps}
    />
  );
};

const filterFn = "includesString";

export { FilterInput, filterFn };
