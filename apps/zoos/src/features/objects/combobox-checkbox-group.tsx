import { Input, createCn } from "@zoos/shadcn";
import { CheckboxGroupVirtual, useVirtualCombobox } from "@zoos/react-form";

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
    <div className="h-full space-y-3">
      <Input
        className={inputClassName}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* <div className="flex max-h-[200px] flex-col gap-3 overflow-auto"> */}
      <div className="h-full overflow-auto" ref={scrollRef}>
        <CheckboxGroupVirtual
          options={optionsFiltered}
          virtualizer={virtualizer}
          className={createCn("flex flex-col gap-3")}
          {...props}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export { ComboboxCheckboxGroup };
