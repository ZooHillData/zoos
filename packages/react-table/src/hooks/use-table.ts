import { useControlledTable } from "./use-controlled-table";
import { useVirtualization } from "./use-virtualization";

type UseTableParams<TData> = Parameters<typeof useControlledTable<TData>>[0] & {
  virtualOptions?: Partial<
    Omit<Parameters<typeof useVirtualization>[0], "table">
  >;
};

/** Combiners virtualization for one call */
const useTable = <TData extends object>({
  virtualOptions = {},
  ...tableOptions
}: UseTableParams<TData> &
  Partial<Omit<Parameters<typeof useVirtualization>[0], "table">>) => {
  const { table } = useControlledTable(tableOptions);

  const {
    row = { estimateSize: () => 24, overscan: 50 },
    column = { overscan: 3 },
  } = virtualOptions;

  const virtualizer = useVirtualization({
    table,
    row,
    column,
  });

  return {
    table,
    ...virtualizer,
  };
};

export { useTable };
