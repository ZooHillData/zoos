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
import { ContextMenuContent, ContextMenuItem } from "@zoos/shadcn";

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
        {
          container: { className: "border text-sm" },
          td: () => ({ className: "p-0" }),
          tdContextMenu: () => ({
            className:
              "group-hover:bg-muted whitespace-nowrap px-3 py-2 bg-background flex items-center",
          }),
          th: () => ({ className: "p-0 w-full bg-muted" }),
          thContextMenu: () => ({
            className: "whitespace-nowrap bg-muted px-3 py-2 w-full text-left",
          }),
          trHead: () => ({ className: "border-b" }),
          trBody: () => ({ className: "hover:cursor-default group border-b" }),
        },
        featureProps.headerIndicators(),
        {
          // Row hover accent
          td: () => ({ className: "group-hover:bg-accent" }),
        },
        {
          // Directory row get bolder font
          td: ({ cellContext: { row } }) => ({
            className: row.subRows.length > 0 ? "font-medium" : "",
          }),
        },
        {
          // Double-click row sets location
          trBody: ({ row, table }) => ({
            className: row.getIsSelected() ? "bg-accent" : "",
            onClick: (event) => {
              if (event.ctrlKey || event.metaKey || event.shiftKey) {
                row.getToggleSelectedHandler()(event);
              } else {
                table.setRowSelection({ [row.id]: !row.getIsSelected() });
              }
            },
            // onDoubleClick: () => {
            //   if (row.subRows.length > 0) {
            //     params.onLocationChange(row.original._dataTree.pathStr);
            //   } else {
            //     params.openObject?.(row.original);
            //   }
            // },
          }),
        },
      ],
    },
  );
  return (
    <Table
      {...{ table, virtualRows, componentProps }}
      contextMenuContent={{
        td: () => (
          <ContextMenuContent>
            <ContextMenuItem>Test</ContextMenuItem>
          </ContextMenuContent>
        ),
      }}
    />
  );
}
