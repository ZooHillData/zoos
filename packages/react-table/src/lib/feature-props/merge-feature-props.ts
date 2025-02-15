import { mergeStyleProps } from "@zoos/shadcn";
import { type ComponentProps } from "./types";

const mergeFeatureProps = <TData, TValue>(
  featureProps: Partial<ComponentProps<TData, TValue>>[],
): ComponentProps<TData, TValue> => ({
  container: mergeStyleProps(
    featureProps.map((props) => props.container || {}),
  ),
  table: mergeStyleProps(featureProps.map((props) => props.table || {})),
  thead: mergeStyleProps(featureProps.map((props) => props.thead || {})),
  trHead: (params) =>
    mergeStyleProps(featureProps.map((props) => props.trHead?.(params) || {})),
  th: (params) =>
    mergeStyleProps(featureProps.map((props) => props.th?.(params) || {})),
  tbody: (params) =>
    mergeStyleProps(featureProps.map((props) => props.tbody?.(params) || {})),
  trBody: (params) =>
    mergeStyleProps(featureProps.map((props) => props.trBody?.(params) || {})),
  td: (params) =>
    mergeStyleProps(featureProps.map((props) => props.td?.(params) || {})),
  tdContextMenu: (params) =>
    mergeStyleProps(
      featureProps.map((props) => props.tdContextMenu?.(params) || {}),
    ),
  thContextMenu: (params) =>
    mergeStyleProps(
      featureProps.map((props) => props.thContextMenu?.(params) || {}),
    ),
  resizeColHandle: (params) =>
    mergeStyleProps(
      featureProps.map((props) => props.resizeColHandle?.(params) || {}),
    ),
});

export { mergeFeatureProps };
