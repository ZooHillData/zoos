import React from "react";

import { GripHorizontalIcon } from "lucide-react";

import { cn } from "@zoos/shadcn";

const GridDragHandle = ({
  spanClassName = "-translate-x-1/2 bg-accent absolute left-1/2 top-[1px] z-20 cursor-move select-none",
  Component = <GripHorizontalIcon className="stroke-primary h-4 w-4" />,
}: {
  spanClassName?: string;
  Component?: React.ReactNode;
}) => (
  <span className={cn("custom-drag-handle", spanClassName)}>{Component}</span>
);

export { GridDragHandle };
