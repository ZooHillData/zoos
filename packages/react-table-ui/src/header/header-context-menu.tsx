import React from "react";

import { type HeaderContext } from "@tanstack/react-table";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuPortal,
} from "@zoos/shadcn";

const HeaderContextMenu = <TData, TValue>({
  header,
  children,
  className,
}: {
  header: HeaderContext<TData, TValue>;
  children: React.ReactNode;
  className?: string;
}) => {
  const numHiddenColumns = Object.entries(
    header.table.getState().columnVisibility,
  ).filter(([_, isVisible]) => !isVisible).length;

  return (
    <ContextMenu>
      <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuLabel>{children}</ContextMenuLabel>
        <ContextMenuSeparator className="mx-1 border-b" />
        {
          // ~ Sorting
        }
        {header.column.getCanSort() && (
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
        {
          // ~ Show / Hide Columns
        }
        {header.column.getCanHide() && (
          <ContextMenuItem
            onClick={() => {
              // If this is a group column, hide all child columns
              if (header.column.columns.length > 0) {
                const visibilityUpdates = Object.fromEntries(
                  header.column.columns.map((col) => [col.id, false]),
                );
                header.table.setColumnVisibility((prev) => ({
                  ...prev,
                  ...visibilityUpdates,
                }));
                return;
              }
              // Otherwise, hide just this column
              header.column.toggleVisibility(false);
            }}
          >
            Hide Column
          </ContextMenuItem>
        )}
        {numHiddenColumns > 0 && (
          <ContextMenuItem
            onClick={() => header.table.setColumnVisibility({})}
            className="text-nowrap"
          >
            Show Hidden Columns ({numHiddenColumns})
          </ContextMenuItem>
        )}
        {
          // ~ Column Pinning
        }
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
        {
          // ~ Column Filtering
        }
        {header.column.getCanFilter() && (
          <ContextMenuSub>
            <ContextMenuSubTrigger>Filter</ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuContent>
                {header.column.columnDef.meta?.Filter?.(header)}
              </ContextMenuContent>
            </ContextMenuPortal>
          </ContextMenuSub>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export { HeaderContextMenu };