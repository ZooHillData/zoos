import { mergeStyleProps } from "@zoos/shadcn";

import type { ComponentProps } from "./types";

type Overrides<TData, TValue> = Partial<
  ReturnType<NonNullable<ComponentProps<TData, TValue>["td"]>>
>;

/** Get props required for sticky headers */
const rowStriping = <TData, TValue>(params?: {
  odd?: Overrides<TData, TValue>;
  even?: Overrides<TData, TValue>;
}) =>
  ({
    td: ({ virtualRow }) =>
      virtualRow.index % 2 === 1
        ? mergeStyleProps([{ className: "bg-muted" }, params?.even || {}])
        : mergeStyleProps([{ className: "bg-background" }, params?.odd || {}]),
  }) satisfies ComponentProps<TData, TValue>;

export { rowStriping };
