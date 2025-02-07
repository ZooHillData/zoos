import { createCn, Input } from "@zoos/shadcn";
import { CheckboxGroupVirtual } from "./checkbox-group-virtual";
import { useVirtualCombobox } from "../hooks/use-virtual-combobox";

const ComboboxCheckboxGroup = ({
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

export { ComboboxCheckboxGroup };
