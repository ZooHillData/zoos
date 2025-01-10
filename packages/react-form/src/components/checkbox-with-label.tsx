import { Checkbox } from "@zoos/shadcn";

type CheckboxProps = React.ComponentProps<typeof Checkbox>;
type CheckboxWithLabelProps = CheckboxProps & {
  label: string;
};

const CheckboxWithLabel = ({ label, ...props }: CheckboxWithLabelProps) => {
  return (
    <label className="flex items-center space-x-2">
      <Checkbox {...props} />
      <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </div>
    </label>
  );
};

export { CheckboxWithLabel };
