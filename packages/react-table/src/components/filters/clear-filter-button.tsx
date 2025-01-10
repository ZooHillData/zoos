import { type HeaderContext } from "@tanstack/react-table";
import { cn, Button, type WithFreshClassName } from "@zoos/shadcn";

const ClearFilterButton = <TData, TValue>({
  headerContext,
  className,
  freshClassName,
  ...buttonProps
}: {
  headerContext: HeaderContext<TData, TValue>;
} & WithFreshClassName<React.ComponentProps<typeof Button>>) => {
  return headerContext.column.getIsFiltered() ? (
    <Button
      size="sm"
      variant="link"
      className={freshClassName || cn("px-0", className)}
      onClick={() => headerContext.column.setFilterValue(undefined)}
      {...buttonProps}
    >
      Clear Filter
    </Button>
  ) : null;
};

export { ClearFilterButton };
