import { type CellContext } from "@tanstack/react-table";

import { ChevronRightIcon, ChevronDownIcon } from "lucide-react";

const ExpandRowCell = <TData, TValue>(props: {
  cellContext: CellContext<TData, TValue>;
  children: React.ReactNode;
  /** How much to indent for each level */
  rowDepthIndentPx?: number;
  /** How large is chevron */
  chevronSizePx?: number;
}) => {
  // Extract props, set defaults
  const {
    cellContext: { row },
    children,
    rowDepthIndentPx = 0,
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
        paddingLeft: `${row.depth * rowDepthIndentPx + nonDirExtraLeftPadding}px`,
      }}
    >
      {hasChildren && (
        <button onClick={() => row.toggleExpanded()}>
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
      <span>{children}</span>
    </div>
  );
};

export { ExpandRowCell };
