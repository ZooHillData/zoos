import { type HeaderContext, type Row } from "@tanstack/react-table";

import { CheckboxWithLabel } from "@zoos/react-form";

const Combobox = (props: {
  options: string[];
  value: string[];
  onClick: (value: string) => void;
}) => {
  return (
    <div className="space-y-2">
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

const Filter = <TData, TValue>({
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
          column.setFilterValue(filterValue.filter((v) => v !== option));
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
  filterValue: string[],
  addMeta: (meta: any) => void,
) => {
  const value = row.getValue<string>(columnId);
  return filterValue.includes(value);
};

export { Filter, filterFn };
