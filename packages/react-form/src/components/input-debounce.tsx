import { useDebounce, Input } from "@zoos/shadcn";

type DebouncedInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange" | "type"
> & {
  value: string;
  onChange: (value: string) => void;
  delay: number;
};

const InputDebounce = ({
  value: debounceValue,
  onChange,
  delay,
  ...props
}: DebouncedInputProps) => {
  const [value, setValue] = useDebounce({
    value: debounceValue,
    delay: delay,
    onChange: onChange,
  });

  return (
    <Input
      {...props}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export { InputDebounce };
