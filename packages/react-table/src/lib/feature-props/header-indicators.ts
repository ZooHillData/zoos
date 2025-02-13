import type { ComponentProps } from "./types";

const headerIndicators = <TData, TValue>(): Partial<
  ComponentProps<TData, TValue>
> => {
  return {
    th: ({ headerContext }) => ({
      className: "flex",
    }),
    thContextMenu: () => ({ className: "text-left w-full" }),
  };
};

export { headerIndicators };
