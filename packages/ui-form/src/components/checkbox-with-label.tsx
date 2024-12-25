"use client";

import { Checkbox } from "@zoos/ui-shad";

type CheckboxProps = React.ComponentProps<typeof Checkbox>;
type CheckboxWithLabelProps = Omit<CheckboxProps, "id"> & {
  id: string;
  label: string;
};

const CheckboxWithLabel = ({ label, ...props }: CheckboxWithLabelProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox {...props} />
      <label
        htmlFor={props.id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export { CheckboxWithLabel };
