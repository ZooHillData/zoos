import * as stringIncludes from "./string-includes";
import * as stringInArray from "./string-in-array";
import * as dateRange from "./date-range";
import * as numberRange from "./number-range";

const filters = {
  string: {
    includes: stringIncludes,
    inArray: stringInArray,
  },
  date: { range: dateRange },
  number: { range: numberRange },
};

export { filters };
export { ClearFilterButton } from "./clear-filter-button";
export { AutoRefreshToggle } from "./auto-refresh-toggle";
