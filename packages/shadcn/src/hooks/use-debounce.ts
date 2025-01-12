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
      // Since the internal value is updated when `value` changes
      // with the `useReactiveState` hook, we have to check
      // that the value has actually changed so we stop the
      // invinite update loop
      if (internalValue !== value) {
        onChange(internalValue);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [internalValue, delay, onChange, value]);

  return [internalValue, setInternalValue] as const;
};

export { useDebounce };
