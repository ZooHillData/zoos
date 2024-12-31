import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/react-table/simple-virtual")({
  component: RouteComponent,
});

import React from "react";
// Create fake user data
import { type User } from "../../lib/fake-data";

import {
  createColumnHelper,
  type TableState,
  type ColumnDef,
  flexRender,
  type Header,
  type Cell,
  type Row,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<User>();
const columns: ColumnDef<User>[] = [
  columnHelper.group({
    header: "Person",
    columns: [
      columnHelper.accessor("first_name", { header: "First" }),
      columnHelper.accessor("last_name", { header: "Last" }),
      columnHelper.accessor("age", { header: "Age" }),
    ],
  }),
  columnHelper.group({
    header: "Address",
    columns: [
      columnHelper.accessor("street", { header: "Street" }),
      columnHelper.accessor("city", { header: "City" }),
      columnHelper.accessor("state", { header: "State" }),
      columnHelper.accessor("zip", { header: "Zip" }),
    ],
  }),
];

import { useControlledTable } from "@zoos/react-table";
import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";

function RouteComponent() {
  const { data } = Route.useRouteContext();

  const [state, setState] = React.useState({} as TableState);

  const { table } = useControlledTable({
    data,
    columns,
    state,
    onStateChange: (state) => setState(state),
  });

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 20,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  const tableState = table.getState();
  const componentProps = React.useMemo(() => {
    const {
      columnSizingInfo: { isResizingColumn },
    } = tableState;
    return {
      container: {
        className: "relative h-fit max-h-full max-w-fit overflow-auto",
      },
      table: {
        className: isResizingColumn ? "grid w-full select-none" : "grid w-full",
      },
      thead: { className: "bg-background sticky top-0 z-10" },
      trhead: { className: "flex w-full" },
      th: ({ header }: { header: Header<User, unknown> }) => ({
        className: "flex",
        style: {
          left: header.getStart(),
          width: header.getSize(),
        },
      }),
      tbody: {
        style: {
          height: rowVirtualizer.getTotalSize(),
        },
      },

      trbody: ({
        row,
        virtualRow,
      }: {
        row: Row<User>;
        virtualRow: VirtualItem;
      }) => ({
        className: "absolute flex",
        style: { transform: `translateY(${virtualRow.start}px)` },
        nClick: () => {
          console.log({ row });
        },
      }),
      td: ({ cell }: { cell: Cell<User, unknown> }) => ({
        className: "",
        style: {
          width: cell.column.getSize(),
        },
      }),
    };
  }, [tableState, rowVirtualizer]);

  return (
    <div className="h-full p-8">
      <div ref={containerRef} {...componentProps.container}>
        <table {...componentProps.table}>
          <thead {...componentProps.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} {...componentProps.trhead}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} {...componentProps.th({ header })}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...componentProps.tbody}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <tr
                  data-index={virtualRow.index}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  key={virtualRow.index}
                  {...componentProps.trbody({ row, virtualRow })}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} {...componentProps.td({ cell })}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
