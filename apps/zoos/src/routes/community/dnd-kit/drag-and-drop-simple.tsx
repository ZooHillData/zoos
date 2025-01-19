import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/community/dnd-kit/drag-and-drop-simple")(
  {
    component: RouteComponent,
  },
);

import React from "react";
import { cn } from "@zoos/shadcn";

import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Droppable = (props: { children: React.ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex h-[300px] items-center justify-center border",
        isOver && "bg-primary-muted",
      )}
    >
      {props.children}
    </div>
  );
};

const Draggable = (props: { children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};

const DragMe = (props: { isDropped: boolean }) => (
  <Draggable>Drag Me{props.isDropped ? " (try dragging out)" : ""}</Draggable>
);

function RouteComponent() {
  const [isDropped, setIsDropped] = React.useState(false);

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <DndContext
        onDragEnd={(event) => {
          console.log(event);
          setIsDropped((event.over?.id || "") === "droppable");
        }}
      >
        {!isDropped ? <DragMe isDropped={isDropped} /> : null}
        <Droppable>
          {isDropped ? <DragMe isDropped={isDropped} /> : "Drop here"}
        </Droppable>
      </DndContext>
      <a
        className="text-primary hover:underline"
        href="https://docs.dndkit.com/introduction/getting-started"
        target="_blank"
        rel="noreferrer"
      >
        Click here for @dnd-kit docs
      </a>
    </div>
  );
}
