import type { Transform } from "@dnd-kit/utilities";
import { CSS } from "@dnd-kit/utilities";

import { cn, mergeStyleProps } from "@zoos/shadcn";

const getCellDragProps = (params: {
  isDragging?: boolean;
  transform: Transform | null;
}) => ({
  className: cn(
    // "relative transition-all duration-200 ease-in-out",
    params.isDragging ? "opacity-80 z-20" : "",
  ),
  style: {
    transform: CSS.Translate.toString(params.transform),
  },
});

export { getCellDragProps };
