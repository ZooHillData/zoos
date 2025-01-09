import { type HeaderContext, type Row } from "@tanstack/react-table";

import { cn } from "@zoos/shadcn";
import { CheckboxWithLabel } from "@zoos/react-form";

const Combobox = (props: {
  options: string[];
  value: string[];
  onClick: (value: string) => void;
  className?: string;
}) => {
  return (
    <div className={cn("space-y-2", props.className || "")}>
      {props.options.map((option) => (
        <CheckboxWithLabel
          checked={props.value.includes(option)}
          onCheckedChange={() => props.onClick(option)}
          label={option}
        />
      ))}
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
      onClick={(option) => {
        if (filterValue.includes(option)) {
          const updated = filterValue.filter((v) => v !== option);
          const updateValue = updated.length === 0 ? undefined : updated;
          column.setFilterValue(undefined);
        } else {
          column.setFilterValue([...filterValue, option]);
        }
      }}
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
