import type { Column, Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@zoos/shadcn";
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
import { Settings } from "lucide-react";
import { InputDebounce } from "@zoos/react-form";
import React from "react";
import { getHeaderContext } from "@zoos/react-table";

type ColumnControlsProps<TData> = {
  table: Table<TData>;
};

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
      <span>{column.id}</span>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Filter
                className={`h-5 w-5 transition-opacity duration-200 ${iconOpacity}`}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <FilterRenderer column={column} table={table} />
          </DropdownMenuContent>
        </DropdownMenu>
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

const ColumnControls = <TData,>({ table }: ColumnControlsProps<TData>) => {
  const [columnSearch, setColumnSearch] = React.useState("");

  const allOrderedColumns = table.getState().columnOrder.map((colId) => {
    // Use table.getColumn(colId) to retrieve the column object.
    return {
      id: colId,
      label: colId,
      value: colId,
    };
  });

  const filteredColumns = allOrderedColumns.filter((col) =>
    col.label.toLowerCase().includes(columnSearch.toLowerCase()),
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Settings className="text-gray-500 hover:text-gray-800" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[50vh] w-[350px] overflow-auto">
        <DropdownMenuLabel>Column Controls</DropdownMenuLabel>

        <InputDebounce
          placeholder={"Search Columns"}
          value={columnSearch}
          onChange={(value) => setColumnSearch(value)}
          delay={300}
        />
        <DropdownMenuGroup>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredColumns}
              strategy={verticalListSortingStrategy}
            >
              <div className="mt-2 flex flex-col gap-1">
                {filteredColumns.map((col) => {
                  const column = table.getColumn(col.id);

                  if (!column) return null;
                  return (
                    <div
                      className="flex w-full items-center gap-1"
                      key={column?.id}
                    >
                      <SortableColumn
                        key={column?.id}
                        column={column}
                        table={table}
                      />
                    </div>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ColumnControls };
