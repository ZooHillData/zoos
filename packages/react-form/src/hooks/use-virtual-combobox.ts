import React from "react";

import {
  type VirtualizerOptions,
  useVirtualizer,
} from "@tanstack/react-virtual";

import { type Options } from "../lib/get-options";
import { useCombobox } from "./use-combobox";

const useVirtualCombobox = ({
  options,
  virtualizerOptions: {
    estimateSize = () => 24,
    overscan = 5,
    ...virtualizerOptions
  },
}: {
  options: Options;
  virtualizerOptions: Omit<
    Partial<VirtualizerOptions<HTMLDivElement, Element>>,
    "count" | "getScrollElement"
  >;
}) => {
  const combobox = useCombobox({ options });
  const [scrollElement, setScrollElement] =
    React.useState<HTMLDivElement | null>(null);
  const scrollRef = React.useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setScrollElement(node);
    }
  }, []);
  const virtualizer = useVirtualizer({
    count: combobox.optionsFiltered.length,
    getScrollElement: () => scrollElement,
    estimateSize: () => 35,
    overscan: 5,
    ...virtualizerOptions,
  });

  return { ...combobox, scrollRef, virtualizer };
};

export { useVirtualCombobox };
