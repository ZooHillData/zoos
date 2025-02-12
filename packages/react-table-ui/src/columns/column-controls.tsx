import React from "react";
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
import { getHeaderContext } from "@zoos/react-table";
import { Input } from "@zoos/shadcn";
import { useVirtualCombobox } from "@zoos/react-form";

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
  const [isOpen, setIsOpen] = React.useState(false);

  const allOrderedColumns = table.getState().columnOrder.map((colId) => {
    return {
      id: colId,
      label: colId,
      value: colId,
    };
  });

  const { query, setQuery, virtualizer, scrollRef } = useVirtualCombobox({
    options: allOrderedColumns,
    virtualizerOptions: {
      estimateSize: () => 34,
      gap: 5,
    },
  });

  // Recalculate virtualization when dropdown opens
  React.useEffect(() => {
    if (isOpen) {
      virtualizer.measure();
    }
  }, [isOpen, virtualizer]);

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
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button>
          <Settings className="text-gray-500 hover:text-gray-800" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[350px] overflow-auto">
        <DropdownMenuLabel>Column Controls</DropdownMenuLabel>

        <Input
          placeholder={"Search Columns"}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <DropdownMenuGroup>
          <div ref={scrollRef} className="mt-2 max-h-[300px] overflow-auto">
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
                  className={"relative w-full"}
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ColumnControls };
