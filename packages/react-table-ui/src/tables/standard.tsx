import type {
  Table as TTable,
  Cell,
  CellContext,
  HeaderContext,
} from "@tanstack/react-table";

import { flexRender } from "@tanstack/react-table";

import { ContextMenu, ContextMenuTrigger, mergeStyleProps } from "@zoos/shadcn";
import { useVirtualization, type ComponentProps } from "@zoos/react-table";

import { HeaderContextMenu, HeaderSortIndicator } from "../header";
import {
  ColumnDndContext,
  ColumnSortableContext,
  getCellDragProps,
  SortableItem,
} from "../column-reorder-dnd";

const Table = <TData extends object, TValue>(props: {
  table: TTable<TData>;
  virtualRows: ReturnType<typeof useVirtualization>["virtualRows"];
  componentProps: ComponentProps<TData, TValue>;
  contextMenuContent?: Partial<{
    td: (cellContext: CellContext<TData, TValue>) => React.ReactNode;
    // th: (headerContext: HeaderContext<TData, TValue>) => React.ReactNode;
  }>;
}) => {
  const { table, virtualRows, componentProps } = props;

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
                            <HeaderContextMenu
                              header={header.getContext()}
                              className="h-full w-full text-left"
                              // Spread attributes and listeners onto the header context menu
                              {...dragHandleProps}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                            </HeaderContextMenu>
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
          <tbody {...componentProps.tbody}>
            {virtualRows.map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <tr
                  key={virtualRow.index}
                  {...componentProps.trBody?.({ row, virtualRow })}
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
                          const tdChildrenMarkup = props.contextMenuContent
                            ?.td ? (
                            <ContextMenu>
                              <ContextMenuTrigger className="flex h-full w-full">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </ContextMenuTrigger>
                              {props.contextMenuContent?.td(cell.getContext())}
                            </ContextMenu>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )
                          );
                          return (
                            <td
                              ref={setNodeRef}
                              {...mergeStyleProps([
                                componentProps.td?.({
                                  cell: cell as Cell<TData, TValue>,
                                  virtualRow,
                                }) || {},
                                dragElementProps,
                              ])}
                            >
                              {tdChildrenMarkup}
                              {/* {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )} */}
                            </td>
                          );
                        }}
                      </SortableItem>
                    ))}
                  </ColumnSortableContext>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </ColumnDndContext>
  );
};

export { Table };
