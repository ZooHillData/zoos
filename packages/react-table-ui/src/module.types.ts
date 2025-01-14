import type { HeaderContext, RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    // Column meta can be extended with custom properties
    Filter?: (headerContext: HeaderContext<TData, TValue>) => React.ReactNode;
    name?: string | null;
    description?: string | null;
  }
}
