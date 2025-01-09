import { cn, Input } from "@zoos/shadcn";

type NumberRange = Partial<{
  from: number;
  to: number;
}>;

const NumberRange2Input = (
  props: Partial<{
    value: NumberRange;
    onChange: (value: NumberRange) => void;
    separator: React.ReactNode;
    componentProps: Partial<{
      from: React.ComponentProps<typeof Input>;
      to: React.ComponentProps<typeof Input>;
    }>;
  }>,
) => {
  const {
    value: { from, to } = {},
    onChange,
    separator = <span className="text-label-foreground">-</span>,
    componentProps: { from: fromProps, to: toProps } = {},
  } = props;

  return (
    <div className={cn("flex items-center gap-1")}>
      <Input
        type="number"
        value={from}
        onChange={(e) => onChange?.({ from: e.target.valueAsNumber, to })}
        {...fromProps}
      />
      {separator}
      <Input
        type="number"
        value={to}
        onChange={(e) => onChange?.({ from, to: e.target.valueAsNumber })}
        {...toProps}
      />
    </div>
  );
};

type NumberRange2InputProps = React.ComponentProps<typeof NumberRange2Input>;

export { NumberRange2Input, type NumberRange, type NumberRange2InputProps };
