import { type SubcomponentProps } from "../types";

/**
 * Function to help get correct props to pass into various **table components** (e.g. `<table />`, `<tbody />`, ...)
 *
 * This function allows directly setting values via the `components` option or setting props via the 
 * `features` option. `features` will set props on the right components to enable a feature (e.g. frozen header).
 *
 * By default, this function will merge styles supplied with default style / className required to make row / column virtualization 
 * work properly. Other than that, no additional styles are applied. At a high level, row virtualization requires:
 * - Table is wrapped in a scroll container with `relative` positioning
 * - Table is laid out with `grid`
 * - Each table row is an absolutely positioned flex container
 *    (translateY set based on row virtualizer)
 *
 * You can wipe these default styles for full control over styling:
 * - **Wipe styles on component -** To wipe only styles on specific component, pass in `wipeStyles: true` inside each table components props.
 * - **Wipe all styles -** You can also pass in `wipeAllStyes: true` at the top level to remove all applied classes / styles. 
 * 
 * (see "Wipe All Styles" example below )
 * 
 * _!! Important: When wiping styles, you will need to address any virtualization / table-related styles yourself. 
 * Reading the code of this function will guide you on the defaults that are set._
 *
 * ## Example use
 *
 * ### Enable props by feature
 *
 * This will add the required classes to the <thead /> component
 * to ensure frozen header:
 *
 * ```ts
 * const componentProps = getComponentProps({
 *  features: {
 *      freezeHeader: true,
 * }
 * ```
 *
 * This also will (directly passing the props to `thead`):
 *
 * ```ts
 * const componentProps = getComponentProps({
 *     components: {
 *        thead: {
 *           className: "bg-background sticky top-0 z-10",
 *       }
 *    }
 * });
 * ```
 * 
 * ### Wipe all styles
 * 
 * ```ts
 *  const componentProps = getComponentProps({
 *   features: {
       // wipe style / className from all components
 *     wipeAllStyles: true,
 *  },
 *  components: {
 *   thead: {
        // wipe style / className for a single component
 *      wipeStyles: true
 * }}
 * }); 
 * ```
 */
const getTableComponentProps = <TData>(params: {
  features: {
    freezeHeader: boolean;
    wipeAllStyles: boolean;
  };
  components: Partial<SubcomponentProps<TData>>;
}) => {
  console.log(params);
};

export { getTableComponentProps };
