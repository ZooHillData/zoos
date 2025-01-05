import { mergeStyleProps } from "@zoos/ui-shad";

import type { ComponentProps } from "./types";
import { HeaderContext } from "@tanstack/react-table";

/** Get props required for column resizing */
const resizeColumn = (params: {
  isResizingColumn: boolean;
  custom?: Pick<ComponentProps, "table" | "resizeColHandle">;
}) => {
  return {
    table: mergeStyleProps([
      { className: params.isResizingColumn ? "select-none" : "" },
      params.custom?.table || {},
    ]),
    // So that resize handle is visible on hover
    th: () => ({ className: "relative group" }),
    resizeColHandle: <TData>({
      headerContext,
    }: {
      headerContext: HeaderContext<TData, unknown>;
    }) =>
      mergeStyleProps([
        {
          className:
            "absolute invisible bg-slate-100 w-[2px] right-0 top-0 h-full hover:cursor-col-resize group-hover:visible",
          onMouseDown: headerContext.header.getResizeHandler(),
          onTouchStart: headerContext.header.getResizeHandler(),
          // ! Reset column size doesn't work b/c of the way we handle column sizing state
          // onDoubleClick: () => headerContext.header.column.resetSize(),
        },
        params.custom?.resizeColHandle?.({ headerContext }) || {},
      ]),
  };
};

export { resizeColumn };
