import { useState, useEffect, useRef, useCallback } from "react";

const useMeasure = <T extends HTMLElement>() => {
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const ref = useRef<T | null>(null);

  const updateSize = useCallback((entries: ResizeObserverEntry[]) => {
    if (entries[0]) {
      const { width, height } = entries[0].contentRect;
      setBounds({ width, height });
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(updateSize);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [updateSize]);

  return [ref, bounds] as const;
};

export { useMeasure };
