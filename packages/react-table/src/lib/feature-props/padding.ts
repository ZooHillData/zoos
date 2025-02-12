import type { ComponentProps } from "./types";

const cellPadding = <TData, TValue>(
  params: Partial<{ className: string; style: React.CSSProperties }>,
): Partial<ComponentProps<TData, TValue>> => {
  return {
    td: () => ({ className: "p-0" }),
    tdContextMenu: () => params,
    // th: () => ({ className: "p-0" }),
    thContextMenu: () => params,
  };
};

export { cellPadding };
