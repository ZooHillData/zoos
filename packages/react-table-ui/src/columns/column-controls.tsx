import React from "react";
import type { Column, Table } from "@tanstack/react-table";
import { Popover, PopoverContent, PopoverTrigger } from "@zoos/shadcn";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpNarrowWide,
  EyeIcon,
  EyeOff,
  Filter,
  GripVertical,
} from "lucide-react";
import { getHeaderContext } from "@zoos/react-table";
import { Input } from "@zoos/shadcn";
import { useVirtualCombobox } from "@zoos/react-form";
import { FormattedId } from "../header/formatted-id";

type ColumnControlsProps<TData> = {
  table: Table<TData>;
  icon: React.ReactNode;


type FilterRendererProps<TData> = {
  column: Column<TData, unknown>;
  table: Table<TData>;
};

const FilterRenderer = <TData,>({
  column,
  table,
}: FilterRendererProps<TData>) => {
  if (!column.columnDef.meta?.Filter) {
    return null;
  }
  const headerContext = getHeaderContext(table, column);
  return column.columnDef.meta.Filter(headerContext);
};

const SortableColumn = <TData,>({
  column,
  table,
}: {
  column: Column<TData, unknown>;
  table: Table<TData>;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const [isHovered, setIsHovered] = React.useState(false);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? "bg-primary" : "bg-background",
  };
  const iconOpacity = isHovered ? "opacity-100" : "opacity-0";

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const relatedTarget = e.relatedTarget;
    if (
      relatedTarget instanceof Node &&
      !e.currentTarget.contains(relatedTarget)
    ) {
      setIsHovered(false);
    }
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`flex w-full items-center rounded-md border p-1 ${
        isDragging && "bg-primary-muted z-50"
      }`}
    >
      <button className="mr-2 cursor-grab p-1" {...listeners}>
        <GripVertical className="h-4 w-4" />
      </button>
      <span className="max-w-[200px] truncate whitespace-nowrap">
        <FormattedId headerContext={getHeaderContext(table, column)} />
      </span>
      <div className="ml-auto flex gap-1">
        <button onClick={() => column.toggleVisibility()}>
          {column.getIsVisible() ? (
            <EyeIcon
              className={`h-5 w-5 transition-opacity duration-200 ${iconOpacity}`}
            />
          ) : (
            <EyeOff
              className={`h-5 w-5 transition-opacity duration-200 ${iconOpacity}`}
            />
          )}
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button>
              <Filter
                className={`h-5 w-5 transition-opacity duration-200 ${iconOpacity}`}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <FilterRenderer column={column} table={table} />
          </PopoverContent>
        </Popover>
        <button onClick={() => column.toggleSorting()}>
          {column.getIsSorted() === "desc" && (
            <ArrowDownNarrowWide
              className={`h-5 w-5 transition-opacity duration-200 ${iconOpacity}`}
            />
          )}
          {column.getIsSorted() === "asc" && (
            <ArrowUpNarrowWide
              className={`h-5 w-5 transition-opacity duration-200 ${iconOpacity}`}
            />
          )}
          {column.getIsSorted() === false && (
            <ArrowDownUp
              className={`h-5 w-5 transition-opacity duration-200 ${iconOpacity}`}
            />
          )}
        </button>
      </div>
    </div>
  );
};

const ColumnControls = <TData,>({
  table,
  icon,
}: ColumnControlsProps<TData>) => {

  const [isOpen, setIsOpen] = React.useState(false);

  const allOrderedColumns = table.getState().columnOrder.map((colId) => ({
    id: colId,
    label: colId,
    value: colId,
  }));

  const { query, setQuery, virtualizer, scrollRef } = useVirtualCombobox({
    options: allOrderedColumns,
    virtualizerOptions: {
      estimateSize: () => 34,
      gap: 5,
    },
  });

  const filteredColumns = allOrderedColumns.filter((col) =>
    col.label.toLowerCase().includes(query.toLowerCase()),
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      // Determine the old and new index of the dragged item.
      const oldIndex = allOrderedColumns.findIndex(
        (item) => item.id === active.id,
      );
      const newIndex = allOrderedColumns.findIndex(
        (item) => item.id === over.id,
      );
      const newOrder = arrayMove(allOrderedColumns, oldIndex, newIndex);
      table.setColumnOrder(newOrder.map((col) => col.id));
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button>{icon}</button>
      </PopoverTrigger>
      <PopoverContent forceMount={true} className="w-[350px] p-0" align="end">
        <div className="p-4 pb-0">
          <div className="mb-2 text-sm font-medium">Column Controls</div>
          <Input
            placeholder="Search Columns"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div ref={scrollRef} className="mt-2 max-h-[300px] overflow-auto p-1">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredColumns}
              strategy={verticalListSortingStrategy}
            >
              <div
                className="relative w-full"
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                }}
              >
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const col = filteredColumns[virtualItem.index];
                  const column = table.getColumn(col.id);

                  if (!column) return null;
                  return (
                    <div
                      className="absolute left-0 top-0 w-full"
                      key={column.id}
                      style={{
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                    >
                      <SortableColumn
                        key={column.id}
                        column={column}
                        table={table}
                      />
                    </div>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { ColumnControls };
