import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/core/react-form/combobox-checkbox-group",
)({
  component: RouteComponent,
});

import React from "react";

import { Label } from "@zoos/shadcn";

import { CheckboxWithLabel, ComboboxCheckboxGroup } from "@zoos/react-form";
import { createData, createRandomUser } from "../../../community/fake-data";

const SingleSelect = () => {
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
    <ComboboxCheckboxGroup
      inputClassName="w-[300px]"
      options={options}
      value={value}
      // Single select set using the option
      onChange={(value, option) =>
        // If value is same, clear the value
        // Otherwise, set the value to the last option clicked (single select)
        setValue((prev) => (prev[0] === option.value ? [] : [option.value]))
      }
      inputPlaceHolder={
        options
          .filter((option) => value.includes(option.value))
          .map((option) => option.label)
          .join(",") || "Select an option"
      }
    />
  );
};

const MultiSelect = () => {
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

  const inputPlaceholder = React.useMemo(() => {
    const filteredOptions = options.filter((option) =>
      value.includes(option.value),
    );
    if (filteredOptions.length > 2) {
      return `${filteredOptions[0].label}, ${filteredOptions[1].label}, ${filteredOptions.length - 2} more`;
    } else if (filteredOptions.length === 0) {
      return "Select option(s)";
    } else {
      return filteredOptions.map((option) => option.label).join(", ");
    }
  }, [options, value]);

  return (
    <ComboboxCheckboxGroup
      options={options}
      value={value}
      onChange={setValue}
      inputClassName="w-[300px]"
      inputPlaceHolder={inputPlaceholder}
    />
  );
};

function RouteComponent() {
  const [isSingleSelect, setIsSingleSelect] = React.useState(true);

  return (
    <div className="h-screen space-y-8 overflow-hidden p-32">
      <div className="space-y-1">
        <CheckboxWithLabel
          label="Multi select?"
          checked={!isSingleSelect}
          onCheckedChange={() => setIsSingleSelect((prev) => !prev)}
        />
        <p className="text-muted-foreground text-sm italic">
          virtualized, {isSingleSelect ? "single" : "multi"} select
        </p>
      </div>
      <div className="space-y-1">
        <Label>Combobox with checkboxes</Label>
        {isSingleSelect ? <SingleSelect /> : <MultiSelect />}
      </div>
    </div>
  );
}

// ! Todo: move this into `form-ui`
export { ComboboxCheckboxGroup };
