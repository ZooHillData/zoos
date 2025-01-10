import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/react-table/standard")({
  component: RouteComponent,
});

import { Table, useTable } from "./-react-table";

function RouteComponent() {
  const { data } = Route.useRouteContext();
  const { table, virtualRows, featureProps } = useTable({
    data,
  });

  return <Table {...{ table, virtualRows, featureProps }} />;
}
