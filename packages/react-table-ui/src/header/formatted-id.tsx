import { type HeaderContext } from "@tanstack/react-table";

import { toKebabCase } from "remeda";

/** Splits ID into words with spaces and converts first letter to uppercase */
const FormattedId = <TData, TValue>(props: {
  headerContext: HeaderContext<TData, TValue>;
}) => {
  return toKebabCase(props.headerContext.column.id)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export { FormattedId };
