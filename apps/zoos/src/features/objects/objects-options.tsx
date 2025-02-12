import type { ObjectTypes, Object } from "./db-interface";
import type { LucideProps } from "lucide-react";

import { BracesIcon, TableIcon, SlidersHorizontalIcon } from "lucide-react";
import { cn } from "@zoos/shadcn";

type ObjectTypeOptions = {
  Icon: React.FC<LucideProps>;
  Editor: React.FC<{ object: Object }>;
};

const OBJECT_TYPE_OPTIONS: { [key in ObjectTypes]: ObjectTypeOptions } = {
  data: {
    Icon: ({ className, ...props }: LucideProps) => (
      <BracesIcon className={cn("stroke-red-500", className)} {...props} />
    ),
    Editor: ({ object }: { object: Object }) => (
      <pre>{JSON.stringify(object, null, 2)}</pre>
    ),
  },
  tableState: {
    Icon: ({ className, ...props }: LucideProps) => (
      <SlidersHorizontalIcon
        className={cn("stroke-primary", className)}
        {...props}
      />
    ),
    Editor: ({ object }: { object: Object }) => (
      <pre>{JSON.stringify(object, null, 2)}</pre>
    ),
  },
  tableData: {
    Icon: ({ className, ...props }: LucideProps) => (
      <TableIcon className={cn("stroke-primary", className)} {...props} />
    ),
    Editor: ({ object }: { object: Object }) => (
      <pre>{JSON.stringify(object, null, 2)}</pre>
    ),
  },
};

export { OBJECT_TYPE_OPTIONS };
export type { ObjectTypeOptions };
