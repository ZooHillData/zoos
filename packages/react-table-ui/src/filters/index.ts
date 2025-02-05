import * as stringIncludes from "./string-includes";
import * as stringInArray from "./string-in-array";
import * as dateRange from "./date-range";
import * as numberRange from "./number-range";
import * as arrayIncludes from "./array-includes";
// import * as arrayIncludesAll from "./array-includes-all";
// import * as arrayIncludesSome from "./array-includes-some";

const filters = {
  string: {
    includes: stringIncludes,
    inArray: stringInArray,
  },
  array: {
    includes: arrayIncludes,
    // includesAll: arrayIncludesAll,
    // includesSome: arrayIncludesSome,
  },
  date: { range: dateRange },
  number: { range: numberRange },
};

export { filters };
