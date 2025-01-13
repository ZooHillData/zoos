import type { ComponentProps } from "../types";

const compact = () =>
  ({
    container: { className: "text-sm" },
    th: () => ({ className: "whitespace-nowrap overflow-hidden px-1 py-0.5" }),
    td: () => ({ className: "whitespace-nowrap overflow-hidden px-1 py-0.5" }),
  }) satisfies ComponentProps<unknown, unknown>;

export { compact };
