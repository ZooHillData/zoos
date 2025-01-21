import { createFileRoute } from "@tanstack/react-router";

const metadata = {
  description: `Expand rows with a separate control column with rotation right-down chevron 'expand toggle button'

- Optional indentation
- Modify cell rendering at different row depths 
`,
};

export const Route = createFileRoute("/core/react-table/expand-rows-control")({
  component: RouteComponent,
  context: () => ({ metadata }),
});

import React from "react";

import type { TreeNode } from "@zoos/navigation";

import { createColumnHelper } from "@tanstack/react-table";

import { getDataTree } from "@zoos/navigation";
import {
  useTable,
  useComponentProps,
  featureProps,
  getColumns,
  mergeColumns,
} from "@zoos/react-table";
import { Table, features } from "@zoos/react-table-ui";

const KEEP_COLUMNS = ["first_name", "last_name", "state"];

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

    const columnHelper = createColumnHelper<TreeNode<(typeof data)[0]>>();
    const columns = getColumns({ data: dataTree })({
      exclude: (columnId) => !KEEP_COLUMNS.includes(columnId),
    });
    return {
      dataTree,
      columns: mergeColumns({ base: columns })({
        overrides: {
          // For state, show value only on parent rows
          expand: features.expandRow.getControlColumnDef(columnHelper),
          state: {
            cell: ({ cell }) =>
              // For state, show value only on parent rows
              cell.row.getCanExpand() ? cell.getValue() : undefined,
          },
          // For name columns, show value only on child rows
          first_name: {
            cell: ({ cell }) =>
              // For name columns, show value only on child rows
              !cell.row.getCanExpand() ? cell.getValue() : undefined,
          },
          last_name: {
            cell: ({ cell }) =>
              !cell.row.getCanExpand() ? cell.getValue() : undefined,
          },
        },
        newColumns: [features.expandRow.getControlColumnDef(columnHelper)],
      }),
    };
  }, [data]);

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } = useTable({
    data: dataTree,
    columns,
    initialState: { columnPinning: { left: ["expand", "state"] } },
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
      mergeProps: [
        featureProps.borders(),
        featureProps.spacing.compact(),
        /*
         ~ Indent subrows 
         Pass left padding to apply at each level.

        To be super correct, need to set `baseLeftPadPx` to account for 
        the standard cell padding (if set) that will be wiped out by `paddingLeft` 
        style applied to subrows.

        You won't have this problem if you put the padding on a the `cell` component
        inside the <td /> but then you introduce a potentially unnecessary dom node
        */
        featureProps.indentSubrows({ indentPx: 0, baseLeftPadPx: 4 }),
      ],
    },
  );

  return <Table {...{ table, componentProps, virtualRows }} />;
}
