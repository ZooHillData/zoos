import type { ComponentProps } from "./types";

const indentSubrows = <TData, TValue>(params?: {
  indentPx?: number;
  baseLeftPadPx?: number;
}) => {
  const { indentPx = 16, baseLeftPadPx = 0 } = params || {};
  return {
    td: ({ cell }) => ({
      style:
        cell.row.depth > 0
          ? { paddingLeft: `${cell.row.depth * indentPx + baseLeftPadPx}px` }
          : undefined,
    }),
  } satisfies ComponentProps<TData, TValue>;
};

export { indentSubrows };
