import type { Table } from "@tanstack/react-table";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

import { DndContext } from "@dnd-kit/core";

const getDragEndHandler = <TData,>(params: { table: Table<TData> }) => {
  return ({ active, over }: DragEndEvent) => {
    if (active && over && active.id !== over.id) {
      params.table.setColumnOrder((columnOrder) => {
        // Get the current column from prev columnOrder state
        // If that doesn't exist, use the current columns as the
        // starting column order (so that you don't have to pass in)
        // `initialState.columnOrder` for column ordering to work
        const columnOrderNonNull =
          columnOrder.length > 0
            ? columnOrder
            : params.table.getAllColumns().map((column) => column.id);

        const oldIndex = columnOrderNonNull.indexOf(active.id as string);
        const newIndex = columnOrderNonNull.indexOf(over.id as string);
        return arrayMove(columnOrderNonNull, oldIndex, newIndex);
      });
    }
  };
};

type DndContextProps<TData> = React.ComponentProps<typeof DndContext> & {
  table: Table<TData>;
  // Call this after the standard table.setColumnOrder
  afterStandardDragEnd?: (event: DragEndEvent) => void;
};

const useDndSensors = () =>
  useSensors(
    // useSensor(PointerSensor, {}),
    // useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

const useColumnDndContext = <TData,>(params: {
  table: Table<TData>;
  afterStandardDragEnd?: (event: DragEndEvent) => void;
}) => {
  const handleDragEnd = getDragEndHandler({ table: params.table });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const dndContextProps = {
    sensors,
    collisionDetection: closestCenter,
    modifiers: [restrictToHorizontalAxis],
    onDragEnd: (event: DragEndEvent) => {
      handleDragEnd(event);
      params.afterStandardDragEnd?.(event);
    },
  };

  return dndContextProps;
};

const getContextProps = (params: React.ComponentProps<typeof DndContext>) => {
  return {
    collisionDetection: closestCenter,
    modifiers: [restrictToHorizontalAxis],
    ...params,
  };
};

const ColumnDndContext = <TData,>({
  table,
  afterStandardDragEnd,
  ...props
}: DndContextProps<TData>) => {
  const handleDragEnd = getDragEndHandler({ table });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const defaults = {
    sensors,
    collisionDetection: closestCenter,
    modifiers: [restrictToHorizontalAxis],
    onDragEnd: (event: DragEndEvent) => {
      handleDragEnd(event);
      afterStandardDragEnd?.(event);
    },
  };

  return <DndContext {...defaults} {...props} />;
};

export {
  useDndSensors,
  useColumnDndContext,
  ColumnDndContext,
  getDragEndHandler,
  getContextProps,
};
