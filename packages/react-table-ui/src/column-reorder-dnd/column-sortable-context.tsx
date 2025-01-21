import type { Table } from "@tanstack/react-table";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

type Props<TData> = Omit<
  React.ComponentProps<typeof SortableContext>,
  "items"
> & {
  table: Table<TData>;
  items?: string[];
};
const ColumnSortableContext = <TData,>({ table, ...props }: Props<TData>) => {
  const { columnOrder } = table.getState();
  const items =
    columnOrder.length > 0
      ? columnOrder
      : table.getAllLeafColumns().map((column) => column.id);

  return (
    <SortableContext
      items={items}
      strategy={horizontalListSortingStrategy}
      {...props}
    />
  );
};

export { ColumnSortableContext };
