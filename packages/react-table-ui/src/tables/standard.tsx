import type { Table as TTable, CellContext } from "@tanstack/react-table";
import type { RowVirtualizer, ComponentProps } from "@zoos/react-table";

import { flexRender } from "@tanstack/react-table";

import { ContextMenu, ContextMenuTrigger, mergeStyleProps } from "@zoos/shadcn";
import { useVirtualization } from "@zoos/react-table";

import {
  ColumnDndContext,
  ColumnSortableContext,
  getCellDragProps,
  SortableItem,
} from "../column-reorder-dnd";
import { HeaderSortIndicator, HeaderContextMenu } from "../header";

type ContextMenuContentProp<TData, TValue> = Partial<{
  td: (cellContext: CellContext<TData, TValue>) => React.ReactNode;
  // th: (headerContext: HeaderContext<TData, TValue>) => React.ReactNode;
}>;

const Table = <TData extends object, TValue>(props: {
  table: TTable<TData>;
  virtualRows: ReturnType<typeof useVirtualization>["virtualRows"];
  rowVirtualizer: RowVirtualizer;
  componentProps: ComponentProps<TData, TValue>;
  contextMenuContent?: ContextMenuContentProp<TData, TValue>;
  emptyDataRow?: (props: {
    table: TTable<TData>;
    rowVirtualizer: ReturnType<typeof useVirtualization>["rowVirtualizer"];
  }) => React.ReactNode;
}) => {
  const { table, virtualRows, rowVirtualizer, componentProps } = props;

  return (
    <ColumnDndContext table={table}>
      <div {...componentProps.container}>
        <table {...componentProps.table}>
          <thead {...componentProps.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                {...componentProps.trHead?.({ headerGroup })}
              >
                <ColumnSortableContext table={table}>
                  {headerGroup.headers.map((header) => (
                    <SortableItem key={header.id} options={{ id: header.id }}>
                      {({
                        isDragging,
                        attributes,
                        listeners,
                        setNodeRef,
                        transform,
                      }) => {
                        const { canReorder = true } =
                          header.column.columnDef.meta || {};
                        const dragHandleProps = canReorder
                          ? { ...listeners, ...attributes }
                          : {};
                        const dragElementProps =
                          !header.column.getIsPinned() || isDragging
                            ? getCellDragProps({
                                isDragging,
                                transform,
                              })
                            : {};

                        return (
                          <th
                            ref={setNodeRef}
                            {...mergeStyleProps([
                              componentProps.th?.({
                                headerContext: header.getContext(),
                              }) || {},
                              dragElementProps,
                            ])}
                          >
                            {
                              // (See below) comments for `ContextMenu` on `<td />`
                              // for info on `modal={false}`
                            }
                            <ContextMenu modal={false}>
                              <HeaderContextMenu
                                header={header.getContext()}
                                {...componentProps.thContextMenu?.({
                                  headerContext: header.getContext(),
                                })}
                                // Spread attributes, listeners onto the header context menu
                                {...dragHandleProps}
                              >
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                    )}
                              </HeaderContextMenu>
                            </ContextMenu>
                            <HeaderSortIndicator
                              // Sort indicator
                              header={header}
                              className="text-primary"
                              onClick={() => header.column.toggleSorting()}
                            />

                            <div
                              // Resize column handle
                              {...componentProps.resizeColHandle?.({
                                headerContext: header.getContext(),
                              })}
                            />
                          </th>
                        );
                      }}
                    </SortableItem>
                  ))}
                </ColumnSortableContext>
              </tr>
            ))}
          </thead>
          <tbody
            {...componentProps.tbody?.({ table, rowVirtualizer })}
            // ! If there no rows, we will add an empty row
            // This "fit-content" will allow the empty row to take
            // up the height it needs for its contents
            {...(virtualRows.length === 0
              ? { style: { height: "fit-content" } }
              : {})}
          >
            {virtualRows.map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <tr
                  key={virtualRow.index}
                  {...componentProps.trBody?.({ table, row, virtualRow })}
                >
                  <ColumnSortableContext table={table}>
                    {row.getVisibleCells().map((cell) => (
                      <SortableItem
                        key={cell.id}
                        options={{ id: cell.column.id }}
                      >
                        {({ setNodeRef, isDragging, transform }) => {
                          const dragElementProps =
                            !cell.column.getIsPinned() || isDragging
                              ? getCellDragProps({
                                  isDragging,
                                  transform,
                                })
                              : {};
                          return (
                            <td
                              ref={setNodeRef}
                              {...mergeStyleProps([
                                componentProps.td?.({
                                  cellContext: cell.getContext(),
                                  virtualRow,
                                }) || {},
                                dragElementProps,
                              ])}
                            >
                              {
                                // ! Workaround to allow spawning <AlertDialog /> from context menu
                                // [link to radix issue](https://github.com/radix-ui/primitives/issues/1836#issuecomment-1547607143)
                                // I believe this is required because when the AlertDialog closes,
                                // the context menu is still open and capturing the focus
                                // `modal={false}` makes it so that ContextMenu does not capture the entire focus
                              }
                              <ContextMenu modal={true}>
                                <ContextMenuTrigger
                                  // Disable the context menu if there is no content
                                  // we leave the context menu because it is used
                                  // a standard entrypoint into styling the component
                                  disabled={!props.contextMenuContent?.td}
                                  {...props.componentProps.tdContextMenu?.({
                                    cellContext: cell.getContext(),
                                  })}
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                                </ContextMenuTrigger>
                                {props.contextMenuContent?.td?.(
                                  cell.getContext(),
                                )}
                              </ContextMenu>
                            </td>
                          );
                        }}
                      </SortableItem>
                    ))}
                  </ColumnSortableContext>
                </tr>
              );
            })}
            {virtualRows.length === 0 && (
              <tr className="flex w-full">
                <td
                  colSpan={table.getVisibleFlatColumns().length}
                  className="flex w-full"
                >
                  {props.emptyDataRow?.({ table, rowVirtualizer })}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </ColumnDndContext>
  );
};

export { Table };
export type { ContextMenuContentProp };
