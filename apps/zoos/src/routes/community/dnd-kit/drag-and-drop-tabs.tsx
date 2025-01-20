import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/community/dnd-kit/drag-and-drop-tabs")({
  component: RouteComponent,
});

import React from "react";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Tabs, TabsList, TabsTrigger, cn } from "@zoos/shadcn";
import { getOptions } from "@zoos/react-form";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  activeId: string;
};
const DragOverlayTabTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ id, className, activeId, ...props }, ref) => {
    return (
      <DragOverlay>
        {activeId && (
          <button
            className={cn(
              // TabsTrigger styling
              "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow",
              // Tabs styling that trickles down (h-9 + p-1 on Tabs === h-8 on TabsTrigger)
              "bg-background text-foreground h-8",
              className,
            )}
            {...props}
            ref={ref}
          >
            {activeId}
          </button>
        )}
      </DragOverlay>
    );
  },
);

const SortableTab = ({
  id,
  name,
  value,
}: {
  id: string;
  name: string;
  value: string;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    // zIndex: isDragging ? 1000 : "auto",
  };

  return (
    <TabsTrigger
      ref={setNodeRef}
      style={style}
      value={value}
      {...attributes}
      {...listeners}
    >
      {name}
    </TabsTrigger>
  );
};

const options = getOptions({
  values: ["Users", "Administrators", "Owners", "Friends"],
});

function RouteComponent({ handleTabChange, tab, tabs }: any) {
  const [optionsOrder, setOptionsOrder] = React.useState(
    options.map((option) => option.value),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setOptionsOrder((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
    setActiveId("");
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 15, // Slight drag distance to improve touch usability
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [activeId, setActiveId] = React.useState<string>("");

  return (
    <div className="m-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        onDragStart={({ active }) => setActiveId(active.id as string)}
      >
        <Tabs
          value={tab}
          onValueChange={handleTabChange}
          // ~ overflow on container
          // To avoid the flash on drop of the preview
          // outside of the container, make sure the container
          // does not allow overflow
          // !! plus update if you have a better pattern !!! 😊
          className="overflow-auto"
        >
          <SortableContext
            items={optionsOrder}
            strategy={horizontalListSortingStrategy}
          >
            <TabsList>
              {optionsOrder.map((tabValue) => {
                const tab = options.find((option) => option.value === tabValue);
                return (
                  <SortableTab
                    key={tab?.value}
                    id={tab?.value || ""}
                    name={tab?.label || ""}
                    value={tab?.value || ""}
                  />
                );
              })}
            </TabsList>
          </SortableContext>
          <DragOverlayTabTrigger activeId={activeId} />
        </Tabs>
      </DndContext>
    </div>
  );
}
