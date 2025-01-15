import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/libraries/react-form/combobox-checkbox-group",
)({
  component: RouteComponent,
});

import React from "react";

import { Input, Label, createCn } from "@zoos/shadcn";
import { CheckboxGroupVirtual, useVirtualCombobox } from "@zoos/react-form";
import { createData, createRandomUser } from "../../../lib/fake-data";

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

function RouteComponent() {
  const [value, setValue] = React.useState<string[]>([]);

  const options = React.useMemo(
    () =>
      createData(createRandomUser, { count: 10000 })
        .map((user) => ({
          value: user.user_id,
          label: `${user.first_name} ${user.last_name}`,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [],
  );

  return (
    <div className="h-screen space-y-3 overflow-hidden p-32">
      <Label>Combobox with checkboxes (virtualized)</Label>
      <ComboboxCheckboxGroup
        inputClassName="w-[300px]"
        options={options}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

// ! Todo: move this into `form-ui`
export { ComboboxCheckboxGroup };
