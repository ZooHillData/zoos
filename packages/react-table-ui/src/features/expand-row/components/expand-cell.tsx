import type { LucideProps } from "lucide-react";
import { type CellContext } from "@tanstack/react-table";

import { ChevronRightIcon, ChevronDownIcon } from "lucide-react";

/** Expand functionality within a table cell */
const ExpandCell = <TData, TValue>(props: {
  cellContext: CellContext<TData, TValue>;
  children: React.ReactNode;
  /** How much to indent for each level */
  depthIndentPx?: number;
  /** How large is chevron */
  chevronSizePx?: number;
}) => {
  // Extract props, set defaults
  const {
    cellContext: { row },
    children,
    depthIndentPx = 0,
    chevronSizePx = 16,
  } = props;

  const hasChildren = row.subRows.length > 0;

  // If no children, add extra padding to the left
  // to offset the chevron
  const nonDirExtraLeftPadding = hasChildren ? 0 : chevronSizePx;

  return (
    <div
      className="flex h-full w-full items-center gap-0.5"
      style={{
        paddingLeft: `${row.depth * depthIndentPx + nonDirExtraLeftPadding}px`,
      }}
    >
      {hasChildren && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            row.toggleExpanded();
          }}
        >
          {row.getIsExpanded() ? (
            <ChevronDownIcon
              style={{ width: chevronSizePx, height: chevronSizePx }}
            />
          ) : (
            <ChevronRightIcon
              style={{ width: chevronSizePx, height: chevronSizePx }}
            />
          )}
        </button>
      )}
      {children}
    </div>
  );
};

const ExpandRowChevronButton = <TData, TValue>(props: {
  cellContext: CellContext<TData, TValue>;
  chevronProps?: LucideProps;
}) => {
  const {
    cellContext: { row },
  } = props;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        row.toggleExpanded();
      }}
    >
      {row.getIsExpanded() ? (
        <ChevronDownIcon {...props.chevronProps} />
      ) : (
        <ChevronRightIcon {...props.chevronProps} />
      )}
    </button>
  );
};

export { ExpandCell, ExpandRowChevronButton };
