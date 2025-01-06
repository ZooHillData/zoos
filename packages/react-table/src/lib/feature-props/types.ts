import type {
  HeaderGroup,
  Header,
  HeaderContext,
  Row,
  Cell,
} from "@tanstack/react-table";
import { type VirtualItem } from "@tanstack/react-virtual";

type ComponentProps = Partial<{
  container: Partial<{
    ref: React.MutableRefObject<HTMLDivElement | null>;
    className: string;
    style: React.CSSProperties;
  }>;
  table: Partial<{ className: string; style: React.CSSProperties }>;
  thead: Partial<{ className: string; style: React.CSSProperties }>;
  trHead: <TData>(params: {
    headerGroup: HeaderGroup<TData>;
  }) => Partial<{ className: string; style: React.CSSProperties }>;
  th: <TData>(params: {
    header: Header<TData, unknown>;
  }) => Partial<{ className: string; style: React.CSSProperties }>;
  tbody: Partial<{ className: string; style: React.CSSProperties }>;
  trBody: <TData>(params: {
    row: Row<TData>;
    virtualRow: VirtualItem;
  }) => Partial<{
    "data-index": number;
    ref: (node: HTMLTableRowElement) => void;
    style: React.CSSProperties;
    className: string;
  }>;
  td: <TData>(params: {
    cell: Cell<TData, unknown>;
    virtualRow: VirtualItem;
  }) => Partial<{
    style: React.CSSProperties;
    className: string;
  }>;
  resizeColHandle: <TData>(params: {
    headerContext: HeaderContext<TData, unknown>;
  }) => Partial<{
    className: string;
    onMouseDown: (event: React.MouseEvent) => void;
    onTouchStart: (event: React.TouchEvent) => void;
    onDoubleClick: (event: React.MouseEvent) => void;
  }>;
}>;

export type { ComponentProps };
