import type { CellContext } from "@tanstack/react-table";

import { ContextMenuItem } from "@zoos/shadcn";

const expand = <TData, TValue>({
  cell: { row },
}: CellContext<TData, TValue>) => (
  <>
    <ContextMenuItem onClick={() => row.toggleExpanded(true)}>
      Expand
    </ContextMenuItem>
    <ContextMenuItem onClick={() => row.toggleExpanded(false)}>
      Collapse
    </ContextMenuItem>
  </>
);

export { expand };
