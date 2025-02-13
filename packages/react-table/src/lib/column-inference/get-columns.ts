import {
  type AccessorColumnDef,
  type ColumnDef,
  type ColumnHelper,
  createColumnHelper,
} from "@tanstack/react-table";

type AccessorColumnDefWithId<TData, TValue> = AccessorColumnDef<
  TData,
  TValue
> & {
  id: keyof TData;
};

/** getColumns helper function  */
const getColumns =
  <TData extends Record<string, unknown>, TValue>({
    data,
  }: {
    data: TData[];
  }) =>
  (params?: {
    exclude?: (columnId: keyof TData) => boolean;
    columnHelper?: ColumnHelper<TData>;
  }) => {
    const {
      exclude = () => false,
      columnHelper = createColumnHelper<TData>(),
    } = params || {};

    const filteredInferred = Object.keys(data[0] || {}).filter(
      (columnId) => !exclude(columnId),
    );

    return filteredInferred.map((columnId) =>
      columnHelper.accessor((row) => row[columnId], {
        id: columnId,
      }),
    ) as AccessorColumnDefWithId<TData, TValue>[];
  };

export { getColumns };
export type { AccessorColumnDefWithId };
