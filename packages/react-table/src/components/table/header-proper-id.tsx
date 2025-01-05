import { type HeaderContext } from "@tanstack/react-table";

import { toKebabCase } from "remeda";

/** Splits ID into words with spaces and converts first letter to uppercase */
const HeaderProperId = <TData,>(header: HeaderContext<TData, unknown>) => {
  return toKebabCase(header.column.id)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export { HeaderProperId };
