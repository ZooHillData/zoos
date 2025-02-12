import { type ComponentProps } from "./types";
import { mergeFeatureProps } from "./merge-feature-props";

// Features
import { resizeColumn } from "./resize-column";
import { stickyHeader } from "./sticky-header";
import { rowVirtualization } from "./row-virtualization";
import { columnPinning } from "./column-pinning";
import { borders } from "./borders";
import { rowStriping } from "./row-striping";
import * as utils from "./utils";
import * as spacing from "./spacing";
import { indentSubrows } from "./indent-subrows";
import { headerIndicators } from "./header-indicators";
import { cellPadding } from "./padding";
const featureProps = {
  resizeColumn,
  stickyHeader,
  rowVirtualization,
  borders,
  columnPinning,
  spacing,
  rowStriping,
  utils,
  indentSubrows,
  headerIndicators,
  cellPadding,
};

export { featureProps, mergeFeatureProps, type ComponentProps };
export { getPinningAttributes, getPinningStyles } from "./column-pinning";
