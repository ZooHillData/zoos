import type { ComponentProps } from "./types";
import { mergeFeatureProps } from "./merge-feature-props";

/** Get props required for sticky headers */
const stickyHeader = <TData, TValue>(params?: {
  custom?: Partial<Pick<ComponentProps<TData, TValue>, "thead">>;
}) =>
  mergeFeatureProps<TData, TValue>([
    {
      thead: { className: "sticky top-0 z-10 bg-background" },
    },
    params?.custom || {},
  ]);

export { stickyHeader };
