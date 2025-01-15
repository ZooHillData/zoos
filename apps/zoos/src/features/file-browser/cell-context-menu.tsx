import type { Row } from "@tanstack/react-table";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuPortal,
  ContextMenuLabel,
  cn,
} from "@zoos/shadcn";

import { PermissionsForm } from "./permissions-form";
import { ownerOptions } from "./column-defs";

const CellContextMenu = <TData,>(props: {
  row: Row<TData>;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}) => {
  const { row, children, className = "", style } = props;

  return (
    <ContextMenu>
      <ContextMenuTrigger
        style={style}
        // "flex h-full w-full" make it so the context menu
        // takes up the full <td />
        className={cn("flex h-full w-full", className)}
      >
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        {props.label && (
          <>
            <ContextMenuLabel>{props.label}</ContextMenuLabel>
            <ContextMenuSeparator className="mx-1 border-b" />
          </>
        )}
        {row.getCanExpand() && (
          <>
            <ContextMenuItem onClick={() => row.toggleExpanded(true)}>
              Expand
            </ContextMenuItem>
            <ContextMenuItem onClick={() => row.toggleExpanded(false)}>
              Collapse
            </ContextMenuItem>
            <ContextMenuSeparator className="mx-1 border-b" />
          </>
        )}
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuItem>Duplicate</ContextMenuItem>
        <ContextMenuItem>Move</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuSeparator className="mx-1 border-b" />
        <ContextMenuItem>Move to Trash</ContextMenuItem>
        <ContextMenuItem>Delete Permanently</ContextMenuItem>
        <ContextMenuSeparator className="mx-1 border-b" />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Edit Permissions</ContextMenuSubTrigger>
          <ContextMenuPortal>
            <ContextMenuContent>
              <PermissionsForm
                permissions={{
                  read: row.getValue("read"),
                  write: row.getValue("write"),
                  manage: row.getValue("manage"),
                }}
                options={ownerOptions}
              />
            </ContextMenuContent>
          </ContextMenuPortal>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export { CellContextMenu };
