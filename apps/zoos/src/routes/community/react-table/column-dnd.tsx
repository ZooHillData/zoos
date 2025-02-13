import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/community/react-table/column-dnd")({
  component: RouteComponent,
});

import React from "react";

// import "./index.css";

import type { TableState } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

// Dnd
import { Button, mergeStyleProps } from "@zoos/shadcn";
import {
  featureProps,
  getColumns,
  useComponentProps,
  useTable,
} from "@zoos/react-table";
import {
  SortableItem,
  HeaderContextMenu,
  HeaderSortIndicator,
  getCellDragProps,
  ColumnDndContext,
  ColumnSortableContext,
} from "@zoos/react-table-ui";

import { createData, createRandomUser } from "../../../community/fake-data";

const data = createData(createRandomUser, { count: 10000 });

/** Helper gets the extra props to add to `<td />` given drag state */

function RouteComponent() {
  // Infer columns
  const columns = React.useMemo(() => getColumns({ data })(), []);

  const [state, setState] = React.useState({
    columnOrder: columns.map((col) => col.id),
  } as TableState);

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } = useTable({
    data,
    columns,
    state,
    onStateChange: setState,
  });

  const componentProps = useComponentProps(
    {
      table,
      rowVirtualizer,
      scrollContainerRef,
    },
    {
      mergeProps: [
        featureProps.borders(),
        {
          container: {
            className: "text-sm whitespace-nowrap text-left",
          },
          th: () => ({
            className: "overflow-hidden bg-background",
          }),
          td: () => ({
            className: "overflow-hidden bg-background",
          }),
        },
        // ! why does adding y-padding break dnd???
        // {
        //   td: () => ({ className: "py-0.5" }),
        // },
      ],
    },
  );

  return (
    <div className="flex h-screen w-screen flex-col gap-2 overflow-hidden p-4">
      <Button
        onClick={() =>
          setState((prev) => ({
            ...prev,
            columnOrder: columns.map((col) => col.id),
          }))
        }
      >
        Reset Column Order
      </Button>
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
                              // Header context menu provides right click
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
                    {...componentProps.trBody?.({ table, row, virtualRow })}
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
                                  cellContext: cell.getContext(),
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
    </div>
  );
}
