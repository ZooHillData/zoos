import { useSortable } from "@dnd-kit/sortable";

type SortableItemProps = {
  children: (props: ReturnType<typeof useSortable>) => React.ReactNode;
  options: Parameters<typeof useSortable>[0];
};

const SortableItem = ({ children, options }: SortableItemProps) => {
  const sortAttributes = useSortable(options);

  return children(sortAttributes);
};

export { SortableItem };
export type { SortableItemProps };
