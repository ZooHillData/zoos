import {
  Select as SelectPrimitive,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@zoos/shadcn";

import { type Options } from "../lib/get-options";

const Select = (props: {
  options: Options;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  sort?: boolean;
  disabled?: boolean;
}) => {
  const options = props.sort
    ? props.options.sort((a, b) => a.label.localeCompare(b.label))
    : props.options;

  return (
    <SelectPrimitive
      disabled={props.disabled}
      value={props.value}
      onValueChange={props.onChange}
    >
      <SelectTrigger className={props.className}>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectPrimitive>
  );
};

export { Select };
