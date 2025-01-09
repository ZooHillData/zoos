import React from "react";

import { useReactiveState } from "./use-reactive-state";

const useDebounce = <T>({
  value,
  delay,
  onChange,
}: {
  value: T;
  delay: number;
  onChange: (value: T) => void;
}) => {
  const [internalValue, setInternalValue] = useReactiveState(value);

  // Debounce the onChange handler
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(internalValue);
    }, delay);

    return () => clearTimeout(timeout);
  }, [internalValue, delay, onChange]);

  return [internalValue, setInternalValue] as const;
};

export { useDebounce };
