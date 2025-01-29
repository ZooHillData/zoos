import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/objects/")({
  component: RouteComponent,
});

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  useComponentProps,
  useTable,
  featureProps,
  mergeColumns,
  getColumns,
} from "@zoos/react-table";
import { Table } from "@zoos/react-table-ui";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@zoos/shadcn";

import { useUserQuery } from "../../../features/auth/queries";
import {
  queries,
  objectsContextMenuItems,
  mutations,
  DEFAULT_OBJECT,
  columnOverrides,
  extraColumns,
} from "../../../features/objects";

const useObjectMutations = () => {
  const { queryClient } = Route.useRouteContext();
  return {
    deleteObject: useMutation(
      mutations.deleteObject({
        queryClient,
        options: {
          onSuccess: ({ data }) => {
            console.log(`Deleted ${data?.length} objects`);
          },
        },
      }),
    ),
    updateObject: useMutation(mutations.updateObject({ queryClient })),
    addObject: useMutation(mutations.addObject({ queryClient })),
  };
};

function RouteComponent() {
  const { data: user } = useUserQuery();
  const { data: objects, isLoading: isObjectsLoading } = useQuery(
    queries.getObjects({ params: {} }),
  );

  const { data: users } = useQuery(queries.getUsersEmails({ params: {} }));
  const { deleteObject, updateObject, addObject } = useObjectMutations();

  const columns = React.useMemo(() => {
    const columns =
      (objects?.length || 0) > 0
        ? getColumns({ data: objects || [] })({
            exclude: (columnId) => columnId.includes("group_ids"),
          })
        : [];
    if (columns.length > 0) {
      return mergeColumns({ base: columns })({
        overrides: columnOverrides,
        newColumns: extraColumns,
      });
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
          className:
            "text-sm hover:cursor-default overflow-hidden whitespace-nowrap bg-background",
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
      <div className="flex h-full flex-col gap-2">
        <Table
          {...{ componentProps, virtualRows, table }}
          contextMenuContent={{
            td: ({ cell }) => (
              <ContextMenuContent
                // Prevent default so that context menu clicks don't trigger
                // the <tr /> onClick passed in componentProps
                onClick={(e) => e.stopPropagation()}
              >
                <ContextMenuItem
                  onSelect={() =>
                    addObject.mutate({
                      object: DEFAULT_OBJECT,
                      authedEmail: user?.email || "",
                    })
                  }
                >
                  New
                </ContextMenuItem>
                <ContextMenuItem
                  onSelect={() =>
                    deleteObject.mutate({ id: cell.row.original.id })
                  }
                >
                  Delete
                </ContextMenuItem>
                <ContextMenuSeparator className="mx-1 border-b" />
                {objectsContextMenuItems({
                  cellContext: cell.getContext(),
                  users: users || [],
                  onUpdateObject: (object) => {
                    if (user?.email) {
                      updateObject.mutate({ object, authedEmail: user.email });
                    }
                  },
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
