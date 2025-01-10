import React from "react";

import { type Options } from "../lib/get-options";

const useCombobox = (params: { options: Options }) => {
  const [query, setQuery] = React.useState("");

  // Get options filtered by the query
  const optionsFiltered = React.useMemo(
    () =>
      params.options.filter(
        (option) =>
          query === "" ||
          option.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [params.options, query],
  );

  // Check for unique values since we don't enforce that with
  // options as arrays
  // Doesn't raise an error, just returns uniqueness to the caller
  const hasUniqueValues = React.useMemo(
    () =>
      new Set(params.options.map((option) => option.value)).size ===
      params.options.length,
    [params.options],
  );

  return {
    query,
    setQuery,
    optionsFiltered,
    hasUniqueValues,
  };
};

export { useCombobox };
