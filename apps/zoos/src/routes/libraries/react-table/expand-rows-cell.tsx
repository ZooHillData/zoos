import { createFileRoute } from "@tanstack/react-router";

const metadata = {
  description: `
Expand rows with an existing accessor column that includes:
- a rotating right-down chevron 'expand toggle button'
- indentation within an existing accessor column
`,
};

export const Route = createFileRoute("/libraries/react-table/expand-rows-cell")(
  {
    component: RouteComponent,
    context: () => ({ metadata }),
  },
);

import React from "react";
import { type TableState, createColumnHelper } from "@tanstack/react-table";

import { getDataTree, type TreeNode } from "@zoos/navigation";
import { featureProps, getColumns } from "@zoos/react-table";
import {
  useTable,
  Table,
  useComponentProps,
  features,
} from "@zoos/react-table-ui";

function RouteComponent() {
  const [state, setState] = React.useState({} as TableState);
  const { data } = Route.useRouteContext();

  const { dataTree, columns } = React.useMemo(() => {
    // Use `buildPathTree` utility to convert flat data into hierarchical
    const dataTree = getDataTree({
      data,
    })({
      getPath: (row) => [row.state, `${row.first_name} ${row.last_name}`],
    })._dataTree.children;

    const columnHelper = createColumnHelper<TreeNode<(typeof data)[0]>>();
    return {
      dataTree,
      columns: getColumns({ data: dataTree })({
        keepColumn: (columnId) =>
          ["first_name", "last_name", "state"].includes(columnId),
        columnHelper,
        columns: {
          _leaf: {
            header: (headerContext) => (
              <features.expandRow.ExpandAllHeader headerContext={headerContext}>
                Key
              </features.expandRow.ExpandAllHeader>
            ),
            cell: (cellContext) => (
              <features.expandRow.ExpandCell
                cellContext={cellContext}
                depthIndentPx={16}
              >
                {
                  // ! why isn't this inferred -__-
                  cellContext.cell.getValue() as string
                }
              </features.expandRow.ExpandCell>
            ),
          },
        },
      }),
    };
  }, [data]);

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } = useTable({
    data: dataTree,
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

  return <Table {...{ table, componentProps, virtualRows }} />;
}
