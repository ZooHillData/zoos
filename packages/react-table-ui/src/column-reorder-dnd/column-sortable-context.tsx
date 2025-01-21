import type { Column, Table } from "@tanstack/react-table";
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
  const { columnOrder, columnPinning } = table.getState();

  // All columns (from current ordering or defaulted from columns in table)
  const columnsInOrder =
    columnOrder.length > 0
      ? columnOrder.map((id) => table.getColumn(id) as Column<TData, unknown>)
      : table.getAllColumns();

  // Final items will put pinned left columns first, then standard clumn
  // rdering then pinned right columns last
  const items = [
    ...(columnPinning.left || []),
    ...columnsInOrder
      .filter((col) => !col?.getIsPinned())
      .map((col) => col.id as string),
    ...(columnPinning.right || []),
  ];

  return (
    <SortableContext
      items={items}
      strategy={horizontalListSortingStrategy}
      {...props}
    />
  );
};

export { ColumnSortableContext };
