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
  placeholder?: React.ReactNode;
  componentProps?: Partial<{
    button: ButtonProps;
    calendar: Partial<{ className: string }>;
  }>;
}) => {
  const {
    value,
    onChange,
    placeholder = "Pick date",
    componentProps: {
      button: { className: buttonClassName, ...buttonProps } = {},
      calendar: calendarProps,
    } = {},
  } = props;
  return (
    <Popover>
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
          onSelect={(date) => onChange?.(date)}
          initialFocus
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
