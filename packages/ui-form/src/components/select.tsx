import {
  Select as SelectPrimitive,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@zoos/ui-shad";

type SelectOption = { value: string; label: string };
type SelectOptions = SelectOption[];

/**
 * Helper function to convert an array of strings to SelectOptions
 * expected by the Select component
 */
const getSelectOptions = ({
  values,
  getLabel = (value: string) => value,
}: {
  values: string[];
  getLabel?: (value: string) => string;
}): SelectOptions => {
  return values.map((value) => ({ value, label: getLabel(value) }));
};

const Select = (props: {
  options: SelectOptions;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
}) => {
  return (
    <SelectPrimitive value={props.value} onValueChange={props.onChange}>
      <SelectTrigger className={props.className}>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectPrimitive>
  );
};

export { Select, getSelectOptions };
