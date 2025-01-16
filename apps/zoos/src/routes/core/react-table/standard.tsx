import { createFileRoute } from "@tanstack/react-router";

const metadata = {
  description: `
Standard table implementation from \`@zoos/react-table-ui\`
`,
};

export const Route = createFileRoute("/core/react-table/standard")({
  component: RouteComponent,
  context: () => ({ metadata }),
});

import React from "react";

import {
  useTable,
  useComponentProps,
  getColumns,
  featureProps,
} from "@zoos/react-table";
import { Table } from "@zoos/react-table-ui";

function RouteComponent() {
  const { data } = Route.useRouteContext();

  const [state, setState] = React.useState({});
  const columns = React.useMemo(() => getColumns({ data })(), [data]);

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } = useTable({
    data,
    columns,
    initialState: {
      columnVisibility: { first_name: false },
    },
    state,
    onStateChange: (state) => {
      console.log("onStateChange", state);
      setState(state);
    },
  });

  // console.log({ state, tableState: table.getState() });

  const componentProps = useComponentProps(
    {
      table,
      rowVirtualizer,
      scrollContainerRef,
    },
    {
      mergeProps: [
        featureProps.borders(),
        featureProps.rowStriping(),
        featureProps.spacing.compact(),
        { th: () => ({ className: "bg-muted" }) },
        {
          td: ({ cell }) =>
            cell.column.id === "_leaf"
              ? { style: { paddingLeft: `${cell.row.depth * 1}rem` } }
              : {},
        },
      ],
    },
  );

  return <Table {...{ table, virtualRows, componentProps }} />;
}
