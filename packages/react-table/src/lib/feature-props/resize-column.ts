import type { ComponentProps } from "./types";
import { mergeFeatureProps } from "./merge-feature-props";

/** Get props required for column resizing */
const resizeColumn = (params: {
  isResizingColumn: boolean;
  custom?: Pick<ComponentProps, "table" | "resizeCol">;
}) =>
  mergeFeatureProps([
    {
      table: { className: params.isResizingColumn ? "select-none" : "" },
      th: () => ({ className: "relative group" }),
      resizeCol: {
        className:
          "absolute invisible bg-primary w-[2px] right-0 top-0 h-full hover:cursor-col-resize group-hover:visible",
      },
    },
    params.custom || {},
  ]);

export { resizeColumn };
