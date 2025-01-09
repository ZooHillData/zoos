import { type HeaderContext } from "@tanstack/react-table";
import { Button } from "@zoos/shadcn";

const ClearFilterButton = <TData, TValue>({
  headerContext,
  buttonProps,
}: {
  headerContext: HeaderContext<TData, TValue>;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>;
}) =>
  headerContext.column.getFilterValue() ? (
    <Button
      size="sm"
      variant="link"
      className="px-0"
      onClick={() => headerContext.column.setFilterValue(undefined)}
      {...buttonProps}
    >
      Clear Filter
    </Button>
  ) : null;

export { ClearFilterButton };
