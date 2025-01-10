import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/objects/table-object-explorer")({
  component: RouteComponent,
});

import { InputDebounce } from "@zoos/react-form";
import { globalFilterFn } from "@zoos/react-table";
import { Table, useTable } from "../react-table/-react-table";

import { createRandomFiles } from "../../lib/fake-data";
const data = createRandomFiles(1000, 4);

function RouteComponent() {
  const { table, virtualRows, featureProps } = useTable({
    data,
    globalFilterFn,
  });

  return (
    <div className="flex h-full flex-col space-y-4 p-4">
      <InputDebounce
        className="w-[500px]"
        value={table.getState().globalFilter}
        onChange={(value) => table.setGlobalFilter(value)}
        delay={300}
        placeholder="Search for files.."
      />
      <Table {...{ table, virtualRows, featureProps }} />
    </div>
  );
}
