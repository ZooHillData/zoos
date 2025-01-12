import type { ComponentProps } from "./types";

const borders = <TData, TValue>() =>
  ({
    container: { className: "border" },
    trHead: () => ({
      className: "border-b",
    }),
    th: () => ({
      className: "border-r last:border-r-0",
    }),
    trBody: () => ({
      className: "border-b last:border-b-0",
    }),
    td: () => ({
      className: "border-r last:border-r-0",
    }),
  }) satisfies ComponentProps<TData, TValue>;

export { borders };
