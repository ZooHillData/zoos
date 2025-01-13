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

const featureProps = {
  resizeColumn,
  stickyHeader,
  rowVirtualization,
  borders,
  columnPinning,
  spacing,
  rowStriping,
  utils,
};

export { featureProps, mergeFeatureProps, type ComponentProps };
export { getPinningAttributes, getPinningStyles } from "./column-pinning";
