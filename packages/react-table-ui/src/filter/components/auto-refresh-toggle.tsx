import React from "react";

import { RefreshCwIcon, RefreshCwOffIcon } from "lucide-react";

import {
  cn,
  Toggle,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@zoos/shadcn";

type AutoRefreshToggleProps = React.ComponentProps<typeof Toggle> & {
  // If passed, will fully replace `className`
  // `className` is merged with `cn`
  freshClassName?: string;
};

const AutoRefreshToggle = ({
  className,
  freshClassName,
  ...props
}: AutoRefreshToggleProps) => {
  const { label, icon } = React.useMemo(() => {
    return props.pressed
      ? { label: "Refresh On", icon: <RefreshCwIcon /> }
      : { label: "Refresh Off", icon: <RefreshCwOffIcon /> };
  }, [props.pressed]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            size="sm"
            className={
              freshClassName ||
              cn(
                "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary-muted hover:text-primary-foreground data-[state=off]:hover:bg-primary-accent inline-flex h-fit gap-1 py-0.5 text-xs [&_svg]:size-3",
                className,
              )
            }
            {...props}
          >
            {label} {icon}
          </Toggle>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          <strong className="text-sm font-medium">Automatic Refresh</strong>
          <ul className="list-disc pl-4">
            <li>
              When on, table will refresh automatically when filter changes
            </li>
            <li>
              If computing filter is too slow, consider turning off during
              filter configuration
            </li>
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { AutoRefreshToggle };
