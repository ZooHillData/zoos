import React from "react";

import ReactGridLayout from "react-grid-layout";

import { useMeasure } from "../use-measure";

const DEFAULT_LAYOUT_PROPS: React.ComponentProps<typeof GridLayout> = {
  rowHeight: 50,
  resizeHandles: ["se", "ne", "sw", "nw"],
  draggableHandle: ".custom-drag-handle",
};

type GridLayoutProps = React.ComponentProps<typeof ReactGridLayout> & {};

function GridLayout(props: GridLayoutProps) {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  return (
    <div className="h-full w-full" ref={ref}>
      {width > 0 && (
        <ReactGridLayout width={width} {...DEFAULT_LAYOUT_PROPS} {...props} />
      )}
    </div>
  );
}

export { GridLayout };
