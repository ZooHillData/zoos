import * as stringIncludes from "./string-includes";
import * as stringInArray from "./string-in-array";

const filters = {
  string: {
    includes: stringIncludes,
    inArray: stringInArray,
  },
};

export { filters };
