import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/react-table/simple-controlled")({
  component: RouteComponent,
});

import React from "react";
import {
  ColumnDef,
  type TableState,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";

// Fake user data
import { type User } from "../../lib/fake-data";

// Standard controlled table hook
import { useControlledTable } from "@zoos/react-table";
// UI components from shad table - optional
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zoos/ui-shad";

// Create columns (no inference)
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

function RouteComponent() {
  // Get data from source (in this example, it's from the contxt defined in
  // react-table/route.tsx)
  const { data } = Route.useRouteContext();

  // Controlled state for the table
  const [state, setState] = React.useState({} as TableState);

  const { table } = useControlledTable({
    data,
    columns,
    state,
    onStateChange: (state) => {
      console.log({ state });
      setState(state);
    },
  });

  return (
    <div className="flex h-full gap-4 overflow-auto p-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
