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

import {
  useControlledTable,
  useComponentProps,
  useVirtualization,
} from "@zoos/react-table";

function RouteComponent() {
  const { data } = Route.useRouteContext();

  const [state, setState] = React.useState({} as TableState);

  const { table } = useControlledTable({
    data,
    columns,
    state,
    onStateChange: (state) => setState(state),
  });

  const { scrollContainerRef, rowVirtualizer, virtualRows, virtualHeight } =
    useVirtualization({
      table,
      rowOptions: {
        estimateSize: () => 20,
        overscan: 5,
      },
      columnOptions: {
        overscan: 3,
      },
    });

  const componentProps = useComponentProps({
    table,
    getComponentProps: () => ({
      tbody: {
        style: { height: `${virtualHeight}px` },
      },
    }),
  });

  return (
    <div className="h-full p-8">
      <div ref={scrollContainerRef} {...componentProps.container}>
        <table {...componentProps.table}>
          <thead {...componentProps.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                {...componentProps.thead_tr?.({ headerGroup })}
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} {...componentProps.th?.({ header })}>
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
            {virtualRows.map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <tr
                  data-index={virtualRow.index} // for dynamic row height
                  ref={(node) => rowVirtualizer.measureElement(node)} // measure dynamic row height
                  key={virtualRow.index}
                  {...componentProps.tbody_tr?.({ row, virtualRow })}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} {...componentProps.td?.({ cell })}>
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
