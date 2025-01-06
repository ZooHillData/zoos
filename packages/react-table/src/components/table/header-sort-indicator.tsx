import { type Header } from "@tanstack/react-table";

import { ArrowDownZaIcon, ArrowUpAzIcon, LucideProps } from "lucide-react";
import { cn } from "@zoos/shadcn";

type Props<TData> = React.HTMLProps<HTMLSpanElement> & {
  header: Header<TData, unknown>;
};

const HeaderSortIndicator = <TData,>({
  header,
  className,
  ...props
}: Props<TData>) => {
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
