import { CheckboxWithLabel } from "./checkbox-with-label";
import { type Options } from "../lib/get-options";

const CheckboxGroup = (props: {
  options: Options;
  value?: string[];
  onChange?: (value: string[]) => void;
  sort?: boolean;
  direction?: "row" | "column";
}) => {
  const options = props.sort
    ? props.options.sort((a, b) => a.label.localeCompare(b.label))
    : props.options;

  const containerClass =
    props.direction === "row"
      ? "flex flex-row gap-x-6 gap-y-3 flex-wrap"
      : "flex flex-col gap-x-6 gap-y-3 flex-wrap";

  return (
    <div className={containerClass}>
      {options.map((option) => (
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
        />
      ))}
    </div>
  );
};

export { CheckboxGroup };
