import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

const getColumns =
  <TData extends Record<string, unknown>>({ data }: { data: TData[] }) =>
  (params?: { columns?: Record<string, Partial<ColumnDef<TData>>> }) => {
    const { columns } = params || {};
    const columnHelper = createColumnHelper<TData>();

    // Combine column IDs from columns passed in and inferred from data
    const columnIds = Array.from(
      new Set([...Object.keys(columns || {}), ...Object.keys(data[0])]),
    );

    return columnIds.map((columnId) =>
      columnHelper.accessor((row) => row[columnId], {
        id: columnId,
        ...columns?.[columnId],
      }),
    );
  };

export { getColumns };
