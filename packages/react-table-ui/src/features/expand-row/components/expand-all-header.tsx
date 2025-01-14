import { type HeaderContext } from "@tanstack/react-table";

import { UnfoldVerticalIcon, FoldVerticalIcon } from "lucide-react";

/** Header shows unfold / fold all on far right, children on far left  */
const ExpandAllHeader = <TData, TValue>(props: {
  headerContext: HeaderContext<TData, TValue>;
  children: React.ReactNode;
}) => (
  <div className="group flex w-full items-center justify-between text-left">
    {props.children}
    <div className="flex gap-1 pr-2">
      <UnfoldVerticalIcon
        onClick={() => props.headerContext.table.toggleAllRowsExpanded(true)}
        className="hover:text-primary invisible size-4 group-hover:visible"
      />
      <FoldVerticalIcon
        onClick={() => props.headerContext.table.toggleAllRowsExpanded(false)}
        className="hover:text-primary invisible size-4 group-hover:visible"
      />
    </div>
  </div>
);

export { ExpandAllHeader };
