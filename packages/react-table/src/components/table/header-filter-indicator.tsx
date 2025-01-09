import { type Header } from "@tanstack/react-table";

import { ArrowDownZaIcon, ArrowUpAzIcon, LucideProps } from "lucide-react";

type Props<TData, TValue> = LucideProps & { header: Header<TData, TValue> };

const HeaderFilterIndicator = <TData, TValue>({
  header,
  ...props
}: Props<TData, TValue>) => {
  if (!header.column.getIsFiltered()) {
    return null;
  }

  switch (header.column.getIsSorted()) {
    case "asc":
      return (
        <span className="inline-flex">
          <ArrowUpAzIcon {...props} />
          {header.column.getSortIndex() + 1}
        </span>
      );
    case "desc":
      return (
        <span className="inline-flex">
          <ArrowDownZaIcon {...props} />
          {header.column.getSortIndex() + 1}
        </span>
      );
    default:
      return null;
  }
};

export { HeaderFilterIndicator };
