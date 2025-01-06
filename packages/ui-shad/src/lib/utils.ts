import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Merge style props (className and style).
 * Remaining props are directly overwritten
 * by spreading the first and then the second
 * the second props other than className and style.
 */
const mergeStyleProps = <
  T extends Partial<{ className: string; style: React.CSSProperties }>,
>(
  toMerge: T[],
) => {
  // Extract className, style and other props
  const classes = toMerge.map((props) => props.className);
  const styles = toMerge.map((props) => props.style);
  const others = toMerge.map((props) => {
    const { className, style, ...others } = props;
    return others;
  });

  // Merge className and style
  const className = cn(...classes);
  const style = Object.assign({}, ...styles);
  const otherProps = Object.assign({}, ...others);

  return { className, style, ...otherProps } as T;
};

export { cn, mergeStyleProps };
