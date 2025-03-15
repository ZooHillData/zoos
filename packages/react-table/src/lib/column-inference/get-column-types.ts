//
// parse-type.ts
// -------------
// parse data types out of strings or the expected
// type
//

const IS_NUMERIC_REGEX = /^[+-]?(?:\d+|\d*\.\d+)(?:[eE][+-]?\d+)?$/;

function isNumeric(value: string | number): boolean {
  if (typeof value === "number") {
    return true;
  }

  if (typeof value !== "string" || !IS_NUMERIC_REGEX.test(value)) {
    return false;
  }

  return true;
}

const IS_DATE_REGEX =
  /^(?:(?:(\d{1,2})-(\d{1,2})-(\d{2}|\d{4}))|(?:(\d{4}|\d{2})-(\d{1,2})-(\d{1,2})))(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(AM|PM))?)?$/;

function isDate(value: string | Date): boolean {
  if (value instanceof Date) {
    return true;
  }

  if (typeof value !== "string" || !IS_DATE_REGEX.test(value)) {
    return false;
  }

  const date = Date.parse(value);

  return !isNaN(date);
}
type ValueType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "function"
  | "undefined"
  | "symbol"
  | "bigint"
  | "date";

function getType<T>(value: string | T): ValueType {
  if (value === undefined || value === null) {
    return "undefined";
  } else if (isNumeric(value as string | number)) {
    return "number";
  } else if (isDate(value as string | Date)) {
    return "date";
  } else {
    return typeof value;
  }
}

function getColumnTypes<T extends Record<string, unknown>>(params: {
  data: T[];
  columnIds?: string[];
}): { [key: string]: ValueType } {
  if (params.data.length === 0) {
    return {};
  }

  const { data, columnIds = Object.keys(data[0]) } = params;

  const types = Object.fromEntries(
    columnIds.map((columnId) => {
      return [columnId, getType(data[0][columnId])];
    }),
  );

  const undefinedKeys = Object.entries(types)
    .filter(([_, value]) => value === "undefined")
    .map(([key, _]) => key);

  if (undefinedKeys.length > 0) {
    for (const columnId of undefinedKeys) {
      let type: ValueType = types[columnId];
      let idx = 1;
      while (type === "undefined" && idx < data.length - 1) {
        type = getType(data[idx][columnId]);
        idx++;
      }

      types[columnId] = type;
    }
  }

  return types;
}

export { getType, getColumnTypes };
export type { ValueType };
