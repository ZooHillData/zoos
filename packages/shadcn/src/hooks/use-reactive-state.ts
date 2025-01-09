import React from "react";

const useReactiveState = <T>(value: T) => {
  const [reactiveValue, setReactiveValue] = React.useState(value);

  // When exteral value changes, modify internal state
  React.useEffect(() => {
    setReactiveValue(value);
  }, [value]);

  return [reactiveValue, setReactiveValue] as const;
};

export { useReactiveState };
