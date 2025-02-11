import React from "react";
import { cn, createCn, Input } from "@zoos/shadcn";
import { CheckboxGroupVirtual } from "./checkbox-group-virtual";
import { useVirtualCombobox } from "../hooks/use-virtual-combobox";

const ComboboxCheckboxGroup = ({
  options,
  inputClassName,
  inputPlaceHolder,
  ...props
}: Omit<React.ComponentProps<typeof CheckboxGroupVirtual>, "virtualizer"> & {
  inputClassName?: string;
  inputPlaceHolder?: string;
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

  const [isFocused, setIsFocused] = React.useState(false);

  if (!hasUniqueValues) {
    window.alert(
      "Options must have unique values. That's one benefit of `Options` as an object with IDs.",
    );
  }

  // This onBlur handler checks whether the newly focused element is outside the container.
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // If the new focused element (relatedTarget) is not a descendant of the container, close the dropdown.
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsFocused(false);
    }
  };
  return (
    <div onBlur={handleBlur} className="w-full">
      <Input
        onFocus={() => setIsFocused(true)}
        className={cn(inputClassName)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={inputPlaceHolder}
      />

      <div
        className={`bg-background w-full overflow-auto rounded border shadow-lg transition-all duration-200 ${
          isFocused
            ? "mt-2 max-h-[500px] p-2 opacity-100"
            : "max-h-0 border-0 p-0 opacity-0"
        }`}
        ref={scrollRef}
      >
        <CheckboxGroupVirtual
          options={optionsFiltered}
          virtualizer={virtualizer}
          {...props}
        />
      </div>
    </div>
  );
};

export { ComboboxCheckboxGroup };
