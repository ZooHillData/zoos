import React from "react";

import { GridDragHandle } from "./drag-handle";
import { RemoveItem } from "./remove-item";
import { type Layout } from "react-grid-layout";

type GridItemProps = React.HTMLAttributes<HTMLDivElement> & {
  item: Layout;
  DragHandle?: React.ReactNode;
  onRemoveItem?: (i: string) => void;
};

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      style,
      className,
      children,
      DragHandle = <GridDragHandle />,
      item,
      onRemoveItem,
      ...rest
    },
    ref
  ) => {
    return (
      <div style={style} className={className} {...rest} ref={ref}>
        {children}
        {DragHandle}
        {onRemoveItem && (
          <RemoveItem onRemoveItem={() => onRemoveItem(item.i)} />
        )}
      </div>
    );
  }
);

export { GridItem };
