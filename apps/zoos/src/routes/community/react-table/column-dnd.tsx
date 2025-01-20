import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/community/react-table/column-dnd")({
  component: RouteComponent,
});

import React from "react";

// import "./index.css";

import type { Cell, Header, TableState } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

// Dnd
import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Button, cn, mergeStyleProps } from "@zoos/shadcn";
import {
  featureProps,
  getColumns,
  useComponentProps,
  useTable,
} from "@zoos/react-table";

import {
  type User,
  createData,
  createRandomUser,
} from "../../../community/fake-data";

const data = createData(createRandomUser, { count: 10000 });

/** Helper gets the extra props to add to `<td />` given drag state */
const getDragProps = (params: {
  isDragging?: boolean;
  transform: Transform | null;
}) => ({
  className: cn(
    // "relative transition-all duration-200 ease-in-out",
    params.isDragging ? "opacity-80 z-10" : "",
  ),
  style: {
    transform: CSS.Translate.toString(params.transform),
  },
});

type DraggableTableHeaderProps =
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    header: Header<User, unknown>;
  };
/** `<th />` column can be dragged */
const DraggableTableHeader = ({
  header,
  ...props
}: DraggableTableHeaderProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const thProps = React.useMemo(
    () => mergeStyleProps([getDragProps({ isDragging, transform }), props]),
    [isDragging, transform, props],
  );

  return (
    <th ref={setNodeRef} {...thProps} {...attributes} {...listeners}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  );
};

type DragAlongCellProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  cell: Cell<User, unknown>;
};
/** `<td />` that follows along with dragging for preview */
const DragAlongCell = ({ cell, ...props }: DragAlongCellProps) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const tdProps = React.useMemo(
    () => mergeStyleProps([getDragProps({ isDragging, transform }), props]),
    [isDragging, transform, props],
  );

  return (
    <th ref={setNodeRef} {...tdProps}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </th>
  );
};

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
          th: () => ({ className: "overflow-hidden bg-background" }),
          td: () => ({ className: "overflow-hidden bg-background" }),
        },
      ],
    },
  );

  // Set column order after drag and drop end
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      table.setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
      >
        <div {...componentProps.container}>
          <table {...componentProps.table}>
            <thead {...componentProps.thead}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  {...componentProps.trHead?.({ headerGroup })}
                >
                  <SortableContext
                    items={table.getState().columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    {headerGroup.headers.map((header) => (
                      <DraggableTableHeader
                        key={header.id}
                        header={header}
                        {...componentProps.th?.({
                          headerContext: header.getContext(),
                        })}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </DraggableTableHeader>
                    ))}
                  </SortableContext>
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
                    <SortableContext
                      items={table.getState().columnOrder}
                      strategy={horizontalListSortingStrategy}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <DragAlongCell
                          key={cell.id}
                          cell={cell}
                          {...componentProps.td?.({
                            cell,
                            virtualRow,
                          })}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </DragAlongCell>
                      ))}
                    </SortableContext>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
      </DndContext>
    </div>
  );
}
