import { cn } from "@zoos/shadcn";

const FilterContainer = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1 px-2 py-1", className)} {...props}>
    {children}
  </div>
);

export { FilterContainer };
