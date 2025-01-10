import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/react-table/custom-columns")({
  component: RouteComponent,
});

import React from "react";

import {
  filters,
  ClearFilterButton,
  AutoRefreshToggle,
} from "@zoos/react-table";
import {
  Label,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
  createCn,
} from "@zoos/shadcn";

import {
  FilterContainer,
  FilterFieldLabel,
  Table,
  useTable,
} from "./-react-table";

// ~ Manual column definitions
// Using `getColumns` to infer all columns
import { type User } from "../../lib/fake-data";
import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper<User>();
const columns = [
  columnHelper.group({
    header: "User",
    columns: [
      columnHelper.accessor("first_name", {}),
      columnHelper.accessor("last_name", {}),
      columnHelper.accessor("age", {
        filterFn: filters.number.range.filterFn,
        meta: {
          Filter: (headerContext) => {
            const [autoRefresh, setAutoRefresh] = React.useState(true);
            return (
              <FilterContainer>
                <div className="ml-auto">
                  <AutoRefreshToggle
                    pressed={autoRefresh}
                    onPressedChange={setAutoRefresh}
                  />
                </div>
                <Label>
                  <FilterFieldLabel headerContext={headerContext} /> Range
                </Label>
                <filters.number.range.FilterInput
                  headerContext={headerContext}
                  autoRefresh={autoRefresh}
                />
                <ClearFilterButton headerContext={headerContext} />
              </FilterContainer>
            );
          },
        },
      }),
    ],
  }),
  columnHelper.accessor("join_date", {
    filterFn: filters.date.range.filterFn,
    meta: {
      Filter: (headerContext) => (
        <FilterContainer>
          <Label>
            <FilterFieldLabel headerContext={headerContext} /> Range
          </Label>
          <filters.date.range.FilterInput headerContext={headerContext} />
          <ClearFilterButton headerContext={headerContext} />
        </FilterContainer>
      ),
    },
  }),
  columnHelper.accessor("street", {
    // ~ Custom cell (tooltip for previewing long text)
    // This does have performance impacts, so recommend
    // using on a per-column basis instead of setting in `defaultColumn`
    cell: (cellContext) => (
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          {/* 
          `className="w-full text-left"` 
            => makes sure alignment is still left but the tooltip takes up the full cell 
          */}
          <TooltipTrigger className="w-full text-left">
            {String(cellContext.getValue())}
          </TooltipTrigger>
          <TooltipContent>{String(cellContext.getValue())}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  }),
  columnHelper.accessor("city", {}),
  columnHelper.accessor("state", {
    // ~ Custom filter
    // specify:
    // - `filterFn` (method)
    // - `meta.filter` (rendered Component)
    // - since this is a `inArray` filter, provide `options` prop to the `input`
    filterFn: filters.string.inArray.filterFn,
    meta: {
      Filter: (headerContext) => (
        <FilterContainer>
          <Label>
            <FilterFieldLabel headerContext={headerContext} /> is in:
          </Label>
          <filters.string.inArray.FilterInput
            headerContext={headerContext}
            inputProps={{
              className: createCn("max-h-[300px]"),
              // Full control over props passed to input
              // (other than those required to connect to
              // `headerContext.column.setFilterValue()`)
              options: Array.from(
                headerContext.column.getFacetedUniqueValues().keys(),
              )
                .sort((a, b) => a.localeCompare(b))
                .map((value) => ({ value, label: value })),
            }}
          />
          <ClearFilterButton headerContext={headerContext} />
        </FilterContainer>
      ),
    },
  }),
  columnHelper.accessor("zip", {}),
];

function RouteComponent() {
  const { data } = Route.useRouteContext();

  const { table, virtualRows, featureProps } = useTable({
    data,
    columns,
  });

  return <Table {...{ table, virtualRows, featureProps }} />;
}