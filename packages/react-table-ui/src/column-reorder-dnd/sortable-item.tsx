import { useSortable } from "@dnd-kit/sortable";

/** Render props for children of the <th /> */

type SortableItemProps = Omit<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  "children"
> & {
  children: (props: ReturnType<typeof useSortable>) => React.ReactNode;
  options: Parameters<typeof useSortable>[0];
};
/** `<th />` column can be dragged */
const SortableItem = ({ children, options, ...props }: SortableItemProps) => {
  const sortAttributes = useSortable(options);

  return children(sortAttributes);
};

export { SortableItem };
export type { SortableItemProps };
