import React from "react";

import { type Header } from "@tanstack/react-table";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@zoos/ui-shad";

const HeaderContextMenu = <TData,>({
  header,
  children,
  className,
}: {
  header: Header<TData, unknown>;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuLabel>{header.column.id}</ContextMenuLabel>
        <ContextMenuSeparator className="mx-1 border-b" />
        {header.column.getCanSort() && (
          // Sorting
          <>
            <ContextMenuItem
              onClick={() => header.column.toggleSorting(true, true)}
            >
              Sort Descending
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => header.column.toggleSorting(false, true)}
            >
              Sort Ascending
            </ContextMenuItem>
            <ContextMenuSeparator className="mx-1 border-b" />
          </>
        )}
        {/* Column visibility (always available) */}
        <ContextMenuItem disabled>Hide Column</ContextMenuItem>
        <ContextMenuItem disabled>Show Hidden Columns</ContextMenuItem>
        {!header.column.getIsPinned() ? (
          <>
            <ContextMenuItem onClick={() => header.column.pin("left")}>
              Pin to Left
            </ContextMenuItem>
            <ContextMenuItem onClick={() => header.column.pin("right")}>
              Pin to Right
            </ContextMenuItem>
          </>
        ) : (
          <ContextMenuItem onClick={() => header.column.pin(false)}>
            Unpin from {header.column.getIsPinned()}
          </ContextMenuItem>
        )}

        {header.column.getCanFilter() && (
          <>
            <ContextMenuSeparator className="mx-1 border-b" />
            <ContextMenuItem disabled>Filter by...</ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export { HeaderContextMenu };
