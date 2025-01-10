import { CheckboxWithLabel } from "./checkbox-with-label";
import { type Options, type Option } from "../lib/get-options";

type CheckboxGroupProps = {
  options: Options;
  value?: string[];
  onChange?: (value: string[], option: Option) => void;
  getCheckboxProps?: (
    option: Option,
  ) => React.ComponentProps<typeof CheckboxWithLabel>;
};

const CheckboxGroup = (props: CheckboxGroupProps) => {
  return (
    <>
      {props.options.map((option) => (
        <CheckboxWithLabel
          key={option.value}
          label={option.label}
          checked={props.value?.includes(option.value)}
          onCheckedChange={(checked) => {
            if (checked) {
              props.onChange?.([...(props.value || []), option.value], option);
            } else {
              props.onChange?.(
                (props.value || []).filter((v) => v !== option.value),
                option,
              );
            }
          }}
          {...props.getCheckboxProps?.(option)}
        />
      ))}
    </>
  );
};

export { CheckboxGroup, type CheckboxGroupProps };
