import { CheckboxWithLabel } from "./checkbox-with-label";
import { type Options, type Option } from "../lib/get-options";

const CheckboxGroup = (props: {
  options: Options;
  value?: string[];
  onChange?: (value: string[]) => void;
  getCheckboxProps?: (
    option: Option,
  ) => React.ComponentProps<typeof CheckboxWithLabel>;
}) => {
  return (
    <>
      {props.options.map((option) => (
        <CheckboxWithLabel
          key={option.value}
          label={option.label}
          checked={props.value?.includes(option.value)}
          onCheckedChange={(checked) => {
            if (checked) {
              props.onChange?.([...(props.value || []), option.value]);
            } else {
              props.onChange?.(
                (props.value || []).filter((v) => v !== option.value),
              );
            }
          }}
          {...props.getCheckboxProps?.(option)}
        />
      ))}
    </>
  );
};

export { CheckboxGroup };
