import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { cn } from "@zoos/shadcn";

type UseSortableResults = ReturnType<typeof useSortable>;
type Params = {
  isDragging: UseSortableResults["isDragging"];
  transform: UseSortableResults["transform"];
};
const getCellDragProps = (params: Params) => ({
  className: cn(
    // "z-20" to get above the pinned columns at z-10
    params.isDragging ? "opacity-80 z-20" : "",
  ),
  style: {
    transform: CSS.Translate.toString(params.transform),
  },
});

export { getCellDragProps };
