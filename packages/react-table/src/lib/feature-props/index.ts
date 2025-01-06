import { type ComponentProps } from "./types";
import { mergeFeatureProps } from "./merge-feature-props";

// Features
import { resizeColumn } from "./resize-column";
import { stickyHeader } from "./sticky-header";
import { rowVirtualization } from "./row-virtualization";
import { borders } from "./borders";
const featureProps = {
  resizeColumn,
  stickyHeader,
  rowVirtualization,
  borders,
};

export { featureProps, mergeFeatureProps, type ComponentProps };
