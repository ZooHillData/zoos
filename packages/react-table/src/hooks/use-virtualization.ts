import type { Table } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";

import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

type RowVirtualizer = Virtualizer<HTMLDivElement, Element>;

type TableVirtualizerOptionsRow = Omit<
  Parameters<typeof useVirtualizer<HTMLDivElement, Element>>[0],
  "count" | "getScrollElement" | "measureElement" | "horizontal"
>;

type TableVirtualizerOptionsColumn = Omit<
  TableVirtualizerOptionsRow,
  "estimateSize"
>;

const useVirtualization = <TData>({
  table,
  row: rowOptions,
  column: columnOptions,
}: {
  table: Table<TData>;
  row: TableVirtualizerOptionsRow;
  column: TableVirtualizerOptionsColumn;
}) => {
  const rows = table.getRowModel().rows;
  const visibleColumns = table.getVisibleLeafColumns();

  // Scroll container defines the virtualization boundary
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    getScrollElement: () => scrollContainerRef.current,
    ...rowOptions,
  });

  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(),
    getScrollElement: () => scrollContainerRef.current,
    ...columnOptions,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const virtualColumns = columnVirtualizer.getVirtualItems();

  // For columns, virtualization is achieved by padding with fake
  // columns on left and right
  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;
  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }

  return {
    rowVirtualizer,
    columnVirtualizer,
    scrollContainerRef,
    virtualRows,
    virtualColumns,
    virtualPaddingLeft,
    virtualPaddingRight,
    virtualHeight: rowVirtualizer.getTotalSize(),
    virtualWidth: columnVirtualizer.getTotalSize(),
  };
};

export { useVirtualization };
export type { RowVirtualizer };
