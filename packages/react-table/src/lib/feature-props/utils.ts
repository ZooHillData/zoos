import type { ComponentProps } from "./types";

const allCells = <TData, TValue>(
  props: ReturnType<NonNullable<ComponentProps<TData, TValue>["td"]>>,
) =>
  ({
    th: () => props,
    td: () => props,
  }) satisfies ComponentProps<TData, TValue>;

export { allCells };
