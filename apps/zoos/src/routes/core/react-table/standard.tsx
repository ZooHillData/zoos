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
  const columns = React.useMemo(
    () => getColumns({ data })({}),

    [data],
  );

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } = useTable({
    data,
    columns,
    // initialState: { columnOrder: columns.map((col) => col.id) },
    state,
    onStateChange: (state) => {
      console.log("onStateChange", state);
      setState(state);
    },
  });

  const componentProps = useComponentProps(
    {
      table,
      rowVirtualizer,
      scrollContainerRef,
    },
    {
      mergeProps: [
        featureProps.utils.allCells({
          className: "text-sm overflow-hidden whitespace-nowrap bg-background",
        }),

        {
          // ~ Drag and drop column props
          //
          th: () => ({
            className: "flex items-center justify-between",
          }),
          td: () => ({
            // ! Required for drag and drop columns
            // why ....
            // technically, leading-5 is not required if the
            // appropriate text size is set (e.g. text-sm)
            className: "whitespace-nowrap leading-5",
          }),
        },
      ],
    },
  );
  return <Table {...{ table, virtualRows, componentProps }} />;
}
