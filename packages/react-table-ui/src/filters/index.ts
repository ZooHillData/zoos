import * as stringIncludes from "./string-includes";
import * as stringInArray from "./string-in-array";
import * as stringInArrayDynamic from "./string-in-array-dynamic";
import * as dateRange from "./date-range";
import * as numberRange from "./number-range";
import * as arrayIncludesAll from "./array-includes-all";
import * as arrayIncludesSome from "./array-includes-some";

const filters = {
  string: {
    includes: stringIncludes,
    inArray: stringInArray,
    inArrayDynamic: stringInArrayDynamic,
  },
  array: {
    includesAll: arrayIncludesAll,
    includesSome: arrayIncludesSome,
  },
  date: { range: dateRange },
  number: { range: numberRange },
};

export { filters };
