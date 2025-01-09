import React from "react";

import { cn } from "@zoos/shadcn";

import { DatePicker } from "./date-picker";

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

const DateRange2Picker = (
  props: Partial<{
    value: DateRange;
    onChange: (value: DateRange) => void;
    separator: React.ReactNode;
    componentProps: Partial<{
      from: Omit<React.ComponentProps<typeof DatePicker>, "value" | "onChange">;
      to: Omit<React.ComponentProps<typeof DatePicker>, "value" | "onChange">;
    }>;
  }>,
) => {
  const {
    value: { from, to } = {},
    onChange,
    separator = <span className="text-label-foreground">-</span>,
    componentProps: { from: fromProps = {}, to: toProps = {} } = {},
  } = props;

  return (
    <div className={cn("flex items-center gap-1")}>
      <DatePicker
        value={from}
        onChange={(date) => {
          onChange?.({ from: date, to });
        }}
        {...fromProps}
      />
      {separator}
      <DatePicker
        value={to}
        onChange={(date) => onChange?.({ from, to: date })}
        {...toProps}
      />
    </div>
  );
};

type DateRange2PickerProps = React.ComponentProps<typeof DateRange2Picker>;

export { DateRange2Picker, type DateRange, type DateRange2PickerProps };
