import {
  type AccessorColumnDef,
  type ColumnHelper,
  createColumnHelper,
} from "@tanstack/react-table";
import type { ValueType } from "./get-column-types";

import { getColumnTypes } from "./get-column-types";

type AccessorColumnDefWithId<TData, TValue> = AccessorColumnDef<
  TData,
  TValue
> & {
  id: keyof TData;
};

/**
 *  Get columns helper function, curried with `data`
 *
 * If pass `getColumnDef`, type inference runs and the
 * inferred type is passed to the `getColumnDef` function
 *
 */
const getColumns =
  <TData extends Record<string, unknown>, TValue>({
    data,
  }: {
    data: TData[];
  }) =>
  (params?: {
    getColumnDef?: (params: {
      columnId: string;
      inferredType: ValueType;
    }) => Partial<AccessorColumnDef<TData, TValue>>;
    exclude?: (columnId: keyof TData) => boolean;
    columnHelper?: ColumnHelper<TData>;
  }) => {
    const {
      exclude = () => false,
      columnHelper = createColumnHelper<TData>(),
    } = params || {};

    const filteredColumnIds = Object.keys(data[0] || {}).filter(
      (columnId) => !exclude(columnId),
    );
    const columnIdToType = params?.getColumnDef
      ? getColumnTypes({
          data,
          columnIds: filteredColumnIds,
        })
      : Object.fromEntries(
          filteredColumnIds.map((columnId) => [
            columnId,
            "unknown" as ValueType,
          ]),
        );

    return Object.entries(columnIdToType).map(([columnId, type]) =>
      columnHelper.accessor((row) => row[columnId], {
        id: columnId,
        ...params?.getColumnDef?.({ columnId, inferredType: type }),
      }),
    ) as AccessorColumnDefWithId<TData, TValue>[];
  };

export { getColumns };
export type { AccessorColumnDefWithId };
