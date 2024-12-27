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
>(props: {
  first?: T;
  second?: T;
}) => {
  // Destructure className and style
  const { className: className1, style: style1, ...keep1 } = props.first || {};
  const { className: className2, style: style2, ...keep2 } = props.second || {};

  // Merge className and style
  const className = cn(className1, className2);
  const style = { ...style1, ...style2 };

  return { className, style, ...keep1, ...keep2 } as T;
};

export { cn, mergeStyleProps };
