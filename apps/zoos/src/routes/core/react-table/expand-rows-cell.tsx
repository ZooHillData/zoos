import { createFileRoute } from "@tanstack/react-router";

const metadata = {
  description: `
Expand rows with an existing accessor column that includes:
- a rotating right-down chevron 'expand toggle button'
- indentation within an existing accessor column
`,
};

export const Route = createFileRoute("/core/react-table/expand-rows-cell")({
  component: RouteComponent,
  context: () => ({ metadata }),
});

import React from "react";

import { getDataTree } from "@zoos/navigation";
import {
  useTable,
  useComponentProps,
  featureProps,
  getColumns,
  mergeColumns,
} from "@zoos/react-table";
import { Table, features, FormattedId } from "@zoos/react-table-ui";

const KEEP_COLUMNS: string[] = ["age", "join_date"];

function RouteComponent() {
  const [state, setState] = React.useState({});
  const { data } = Route.useRouteContext();

  const { dataTree, columns } = React.useMemo(() => {
    // Use `buildPathTree` utility to convert flat data into hierarchical
    const dataTree = getDataTree({
      data,
    })({
      getPath: (row) => [row.state, `${row.first_name} ${row.last_name}`],
    })._dataTree.children;

    const columns = getColumns({ data: dataTree })({
      exclude: (columnId) => !KEEP_COLUMNS.includes(columnId),
    });
    return {
      dataTree,
      columns: mergeColumns({ base: columns })({
        newColumns: [
          {
            id: "leaf",
            accessorFn: (row) => row._dataTree.leaf,
            header: (headerContext) => (
              <features.expandRow.ExpandAllHeader headerContext={headerContext}>
                Leaf
              </features.expandRow.ExpandAllHeader>
            ),
            cell: (cellContext) => (
              <features.expandRow.ExpandCell
                cellContext={cellContext}
                depthIndentPx={16}
              >
                {cellContext.cell.getValue() as string}
              </features.expandRow.ExpandCell>
            ),
          },
        ],
      }),
    };
  }, [data]);

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } = useTable({
    data: dataTree,
    defaultColumn: {
      // Use standard header context
      header: (headerContext) => <FormattedId headerContext={headerContext} />,
      // If not the 'leaf' column and at a parent row (for state)
      // don't show other values b/c they are not relevant on the
      // group level (e.g. `age` is not applicable to a `state` level)
      cell: ({ cell, column, row }) =>
        column.id !== "leaf" && row.getCanExpand()
          ? "-"
          : String(cell.getValue()),
    },
    columns,
    state,
    onStateChange: setState,
    getSubRows: (row) => row._dataTree.children,
  });

  const componentProps = useComponentProps(
    {
      table,
      rowVirtualizer,
      scrollContainerRef,
    },
    {
      mergeProps: [featureProps.borders(), featureProps.spacing.compact()],
    },
  );

  return <Table {...{ table, componentProps, virtualRows, rowVirtualizer }} />;
}
