import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/core/react-table/custom-columns")({
  component: RouteComponent,
});

import React from "react";

import { createColumnHelper } from "@tanstack/react-table";

import {
  filters,
  ClearFilterButton,
  AutoRefreshToggle,
  FilterContainer,
  FormattedId,
  Table,
} from "@zoos/react-table-ui";
import { useTable, useComponentProps, featureProps } from "@zoos/react-table";

import {
  Label,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
  createCn,
} from "@zoos/shadcn";

const mapping = {
  text: {
    filters: [
      {
        filterFn: "string.includes",
        label: "Includes",
        meta: { Filter: (headerContext) => <div></div> },
      },
      "string.regex",
    ],
    cells: [{}],
  },
  // Probably doesn't mater  for now
  "protected-text": ["string.inArray", "string.includes", "string.regex"],
  date: ["date.range"],
  longText: ["string.includes", "string.regex"],
  // Boolean not used by FCS, is used elsewhere
  // previously, have converted boolean to string
  // and used string.inArray ["true", "false"]
  // "boolean": []
  selectAll: ["array.includesSome", "array.includesAll"],
  multipleChoice: ["string.inArray", "string.includes", "string.regex"],
  currency: ["number.range"],
  number: ["number.range"],
  select: ["string.inArray", "string.includes", "string.regex"],
};

// ~ Manual column definitions
// Using `getColumns` to infer all columns
import { type User } from "../../../community/fake-data";
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
                  <FormattedId headerContext={headerContext} /> Range
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
            <FormattedId headerContext={headerContext} /> Range
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
            <FormattedId headerContext={headerContext} /> is in:
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
  const [state, setState] = React.useState({});

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } = useTable({
    data,
    columns,
    state,
    onStateChange: (state) => setState(state),
  });

  const componentProps = useComponentProps(
    {
      table,
      rowVirtualizer,
      scrollContainerRef,
    },
    {
      mergeProps: [
        featureProps.spacing.compact(),
        featureProps.rowStriping(),
        featureProps.borders(),
        { th: () => ({ className: "bg-muted" }) },
      ],
    },
  );

  return <Table {...{ table, virtualRows, componentProps }} />;
}
