import type { ComponentProps } from "./types";
import { mergeFeatureProps } from "./merge-feature-props";

/** Get props required for sticky headers */
const stickyHeader = (params?: { custom?: Pick<ComponentProps, "thead"> }) =>
  mergeFeatureProps([
    {
      thead: { className: "sticky top-0 z-10" },
    },
    params?.custom || {},
  ]);

export { stickyHeader };
