import { createColumnHelper } from "@tanstack/react-table";

const getColumns = <TData extends object>(params: { data: TData[] }) => {
  const columnIds = Object.keys(params.data[0]);
  const columnHelper = createColumnHelper<TData>();

  return columnIds.map((columnId) => {
    return columnHelper.accessor((row) => row[columnId as keyof TData], {
      id: columnId,
    });
  });
};

export { getColumns };
