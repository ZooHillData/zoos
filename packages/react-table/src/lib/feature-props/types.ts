import type {
  HeaderGroup,
  HeaderContext,
  Row,
  Cell,
} from "@tanstack/react-table";
import { type VirtualItem } from "@tanstack/react-virtual";

type ComponentProps<TData, TValue> = Partial<{
  container: Partial<{
    ref: React.MutableRefObject<HTMLDivElement | null>;
    className: string;
    style: React.CSSProperties;
  }>;
  table: Partial<{ className: string; style: React.CSSProperties }>;
  thead: Partial<{ className: string; style: React.CSSProperties }>;
  trHead: (params: {
    headerGroup: HeaderGroup<TData>;
  }) => Partial<{ className: string; style: React.CSSProperties }>;
  th: (params: {
    headerContext: HeaderContext<TData, TValue>;
  }) => Partial<{ className: string; style: React.CSSProperties }>;
  tbody: Partial<{ className: string; style: React.CSSProperties }>;
  trBody: (params: { row: Row<TData>; virtualRow: VirtualItem }) => Partial<
    Omit<
      React.HTMLAttributes<HTMLTableRowElement>,
      "data-index" | "ref" | "style" | "className"
    > & {
      "data-index": number;
      ref: (node: HTMLTableRowElement) => void;
      style: React.CSSProperties;
      className: string;
    }
  >;
  td: (params: {
    cell: Cell<TData, TValue>;
    virtualRow: VirtualItem;
  }) => Partial<{
    style: React.CSSProperties;
    className: string;
  }>;
  resizeColHandle: (params: {
    headerContext: HeaderContext<TData, TValue>;
  }) => Partial<{
    className: string;
    onMouseDown: (event: React.MouseEvent) => void;
    onTouchStart: (event: React.TouchEvent) => void;
    onDoubleClick: (event: React.MouseEvent) => void;
  }>;
}>;

export type { ComponentProps };
