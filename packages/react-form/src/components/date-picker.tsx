import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  cn,
  Button,
  Calendar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  type ButtonProps,
} from "@zoos/shadcn";

const DatePicker = (props: {
  value?: Date;
  onChange?: (date?: Date) => void;
  // if true, don't close the popover onChange
  keepOpen?: boolean;
  placeholder?: React.ReactNode;
  componentProps?: Partial<{
    button: ButtonProps;
    calendar: Partial<{ className: string }>;
  }>;
}) => {
  const {
    keepOpen = false,
    value,
    onChange,
    placeholder = "Pick date",
    componentProps: {
      button: { className: buttonClassName, ...buttonProps } = {},
      calendar: calendarProps,
    } = {},
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            buttonClassName,
          )}
          {...buttonProps}
        >
          <CalendarIcon />
          {value ? format(value, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (!keepOpen) {
              setIsOpen(false);
            }
            onChange?.(date);
          }}
          initialFocus
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
