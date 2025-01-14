import { AccessorColumnDef, type ColumnDef } from "@tanstack/react-table";

const mergeColumns =
  <TData>({
    base,
  }: {
    // initial column defs
    base: AccessorColumnDef<TData>[];
  }) =>
  (params?: {
    // columns to merge in
    overrides?: { [key: string]: Partial<AccessorColumnDef<TData>> };
    // columns t merge in
    newColumns?: ColumnDef<TData>[];
    // where to put new columns being merged in
    newPlacement?: "start" | "end";
  }) => {
    const { overrides, newColumns, newPlacement = "start" } = params || {};

    // Map over base columns, merging in incoming overrides
    const mergedBase: AccessorColumnDef<TData>[] = base.map((column) => ({
      ...column,
      ...((overrides?.[column.id || ""] ?? {}) as AccessorColumnDef<TData>),
    }));

    // Depending on newPlacement and newColumns existence,
    // add newColumns to the beginning or end of mergedBase
    if (!newColumns) return mergedBase;
    else {
      if (newPlacement === "start") {
        return [...newColumns, ...mergedBase];
      } else if (newPlacement === "end") {
        return [...mergedBase, ...newColumns];
      } else {
        throw new Error(`Invalid newPlacement: ${newPlacement}`);
      }
    }
  };

export { mergeColumns };
