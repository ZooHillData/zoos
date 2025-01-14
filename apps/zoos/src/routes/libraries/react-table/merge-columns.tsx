import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/libraries/react-table/merge-columns")({
  component: RouteComponent,
});

import React from "react";
import { InputDebounce } from "@zoos/react-form";
import { Checkbox } from "@zoos/shadcn";
import { mergeColumns, getColumns, featureProps } from "@zoos/react-table";
import { useTable, useComponentProps, Table } from "@zoos/react-table-ui";
import { createColumnHelper, TableState } from "@tanstack/react-table";

const EXCLUDE_COLUMNS = ["user_id", "join_date"];

function RouteComponent() {
  const { data } = Route.useRouteContext();

  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<(typeof data)[0]>();

    // Exclude columns in the `getColumns` function
    const base = getColumns({ data })({
      exclude: (columnId) => EXCLUDE_COLUMNS.includes(columnId),
    });

    // Merge in overrides to existing and new columns
    // - `first_name` receives a custom cell renderer
    // - `control` is a new column with a custom cell renderer
    return mergeColumns({
      base,
    })({
      overrides: {
        first_name: {
          cell: ({ cell }) => (
            <div className="bg-secondary h-full w-full">
              {cell.getValue() as string}
            </div>
          ),
        },
      },
      // Specify new columns to add in. Nice to do here, because
      // you're already in type-safe function call
      //
      // In this example, add a checkbox column for row selection
      newColumns: [
        columnHelper.display({
          id: "select",
          cell: ({ row }) => (
            <div className="flex h-full items-center justify-center">
              <Checkbox
                onCheckedChange={(checked) => {
                  row.toggleSelected(checked === true);
                }}
              />
            </div>
          ),
          size: 25,
          enableResizing: false,
        }),
      ],
      newPlacement: "start",
    });
  }, [data]);

  ///
  /// Standard Table
  ///
  const [state, setState] = React.useState({} as TableState);

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } = useTable({
    data,
    columns,
    state,
    onStateChange: (state) => {
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
        featureProps.borders(),
        featureProps.rowStriping(),
        featureProps.spacing.compact(),
      ],
    },
  );

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <InputDebounce
          className="w-[300px]"
          value={table.getState().globalFilter || ""}
          onChange={(value) => table.setGlobalFilter(value)}
          delay={300}
          placeholder="Global search.."
        />
        <div className="flex">
          Selected Rows:{" "}
          {Object.entries(state.rowSelection || {})
            .filter(([columnId, isSelected]) => isSelected)
            .map(([columnId]) => columnId)
            .join(", ")}
        </div>
      </div>
      <Table {...{ table, virtualRows, componentProps }} />
    </div>
  );
}
