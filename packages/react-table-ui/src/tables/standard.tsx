import type { Table as TTable, Cell } from "@tanstack/react-table";

import { flexRender } from "@tanstack/react-table";

import { mergeStyleProps } from "@zoos/shadcn";
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
                      }) => (
                        <th
                          ref={setNodeRef}
                          {...mergeStyleProps([
                            componentProps.th?.({
                              headerContext: header.getContext(),
                            }) || {},
                            getCellDragProps({ isDragging, transform }),
                          ])}
                        >
                          <HeaderContextMenu
                            header={header.getContext()}
                            className="flex w-full justify-between"
                            // Spread attributes and listeners onto the header context menu
                            // (this is a <span />)
                            {...attributes}
                            {...listeners}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                            <HeaderSortIndicator
                              // Sort indicator
                              header={header}
                              className="text-primary"
                              onClick={() => header.column.toggleSorting()}
                            />
                          </HeaderContextMenu>
                          <div
                            // Resize column handle
                            {...componentProps.resizeColHandle?.({
                              headerContext: header.getContext(),
                            })}
                          />
                        </th>
                      )}
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
                        {({ setNodeRef, isDragging, transform }) => (
                          <td
                            ref={setNodeRef}
                            {...mergeStyleProps([
                              componentProps.td?.({
                                cell: cell as Cell<TData, TValue>,
                                virtualRow,
                              }) || {},
                              getCellDragProps({ isDragging, transform }),
                            ])}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        )}
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
