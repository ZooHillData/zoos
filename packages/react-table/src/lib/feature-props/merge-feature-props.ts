import { mergeStyleProps } from "@zoos/ui-shad";
import { type ComponentProps } from "./types";

const mergeFeatureProps = (
  featureProps: Partial<ComponentProps>[],
): ComponentProps => ({
  container: mergeStyleProps(
    featureProps.map((props) => props.container || {}),
  ),
  table: mergeStyleProps(featureProps.map((props) => props.table || {})),
  thead: mergeStyleProps(featureProps.map((props) => props.thead || {})),
  trHead: (params) =>
    mergeStyleProps(featureProps.map((props) => props.trHead?.(params) || {})),
  th: (params) =>
    mergeStyleProps(featureProps.map((props) => props.th?.(params) || {})),
  tbody: mergeStyleProps(featureProps.map((props) => props.tbody || {})),
  trBody: (params) =>
    mergeStyleProps(featureProps.map((props) => props.trBody?.(params) || {})),
  td: (params) =>
    mergeStyleProps(featureProps.map((props) => props.td?.(params) || {})),
  resizeColHandle: (params) =>
    mergeStyleProps(
      featureProps.map((props) => props.resizeColHandle?.(params) || {}),
    ),
});

export { mergeFeatureProps };
