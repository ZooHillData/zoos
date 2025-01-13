import { type Header } from "@tanstack/react-table";

import { ArrowDownZaIcon, ArrowUpAzIcon } from "lucide-react";
import { cn } from "@zoos/shadcn";

type Props<TData, TValue> = React.HTMLProps<HTMLSpanElement> & {
  header: Header<TData, TValue>;
};

const HeaderSortIndicator = <TData, TValue>({
  header,
  className,
  ...props
}: Props<TData, TValue>) => {
  switch (header.column.getIsSorted()) {
    case "asc":
      return (
        <span
          className={cn(
            "inline-flex items-center text-xs font-medium",
            className,
          )}
          {...props}
        >
          <ArrowUpAzIcon size="1.25em" className="inline align-text-bottom" />
          {header.column.getSortIndex() + 1}
        </span>
      );
    case "desc":
      return (
        <span
          className={cn(
            "inline-flex items-center text-xs font-medium",
            className,
          )}
          {...props}
        >
          <ArrowDownZaIcon size="1.25em" className="inline align-text-bottom" />
          {header.column.getSortIndex() + 1}
        </span>
      );
    default:
      return null;
  }
};

export { HeaderSortIndicator };
