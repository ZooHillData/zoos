import {
  type ColumnDef,
  type ColumnHelper,
  createColumnHelper,
} from "@tanstack/react-table";

/** getColumns helper function  */
const getColumns =
  <TData extends Record<string, unknown>>({ data }: { data: TData[] }) =>
  (params?: {
    keepColumn?: (columnId: keyof TData) => boolean;
    columns?: Record<string, Partial<ColumnDef<TData>>>;
    columnHelper?: ColumnHelper<TData>;
  }) => {
    const {
      columns,
      columnHelper = createColumnHelper<TData>(),
      keepColumn = () => true,
    } = params || {};

    const filteredInferred = Object.keys(data[0]).filter((columnId) =>
      keepColumn(columnId),
    );

    // Combine column IDs from columns passed in and inferred from data
    const columnIds = Array.from(
      new Set([...Object.keys(columns || {}), ...filteredInferred]),
    );

    return columnIds.map((columnId) =>
      columnHelper.accessor((row) => row[columnId], {
        id: columnId,
        ...columns?.[columnId],
      }),
    );
  };

export { getColumns };
