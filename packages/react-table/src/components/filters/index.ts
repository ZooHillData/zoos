import * as stringIncludes from "./string-includes";
import * as stringInArray from "./string-in-array";
import * as dateRange from "./date-range";

const filters = {
  string: {
    includes: stringIncludes,
    inArray: stringInArray,
  },
  date: { range: dateRange },
};

export { filters };
export { ClearFilterButton } from "./clear-filter-button";
