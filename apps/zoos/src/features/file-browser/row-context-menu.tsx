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
} from "@zoos/shadcn";

import { PermissionsForm } from "./permissions-form";

const RowContextMenu = <TData,>(props: {
  row: Row<TData>;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}) => {
  const { row, children, className = "", style } = props;

  return (
    <ContextMenu>
      <ContextMenuTrigger className={className} style={style}>
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
              <PermissionsForm />
            </ContextMenuContent>
          </ContextMenuPortal>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export { RowContextMenu };
