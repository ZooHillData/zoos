import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/objects/")({
  component: RouteComponent,
});

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useComponentProps,
  useTable,
  featureProps,
  mergeColumns,
  getColumns,
} from "@zoos/react-table";
import { contextMenuItems, Table } from "@zoos/react-table-ui";

import { ContextMenuContent, ContextMenuSeparator } from "@zoos/shadcn";

import {
  queries,
  columnOverrides,
  objectsContextMenuItems,
} from "../../../features/objects";
import { getQueryKey } from "../../../lib/supabase";

function RouteComponent() {
  const { data: objects, isLoading: isObjectsLoading } = useQuery(
    queries.getObjects({ params: {} }),
  );

  const { data: users } = useQuery({
    queryKey: getQueryKey(["users"]),
    queryFn: async () => {
      return [
        "art@zoohilldata.com",
        "arterry1618@gmail.com",
        "bk@zoohilldata.com",
      ];
    },
  });

  const columns = React.useMemo(() => {
    const columns =
      (objects?.length || 0) > 0 ? getColumns({ data: objects || [] })() : [];
    if (columns.length > 0) {
      return mergeColumns({ base: columns })({ overrides: columnOverrides });
    }
    return [];
  }, [objects]);

  const { rowVirtualizer, virtualRows, table, scrollContainerRef } = useTable({
    data: objects || [],
    columns,
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
          trBody: ({ row }) => ({
            onClick: () => window.alert(`Row Clicked: ${row.id}`),
          }),
        },
      ],
    },
  );

  if (isObjectsLoading) {
    return <p className="text-sm">Objects Loading...</p>;
  }

  if ((objects?.length || 0) > 0) {
    return (
      <div className="flex h-full flex-col">
        <Table
          {...{ componentProps, virtualRows, table }}
          contextMenuContent={{
            td: ({ cell }) => (
              <ContextMenuContent
                // Prevent default so that context menu clicks don't trigger
                // the <tr /> onClick passed in componentProps
                onClick={(e) => e.stopPropagation()}
              >
                {contextMenuItems.expand(cell.getContext())}
                <ContextMenuSeparator className="mx-1 border-b" />
                {objectsContextMenuItems({
                  cellContext: cell.getContext(),
                  users: users || [],
                })}
              </ContextMenuContent>
            ),
          }}
        />
      </div>
    );
  }

  return <p>No Rows :(</p>;
}
