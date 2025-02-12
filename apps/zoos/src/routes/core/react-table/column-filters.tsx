import { createFileRoute } from "@tanstack/react-router";

import React from "react";

import { createColumnHelper } from "@tanstack/react-table";

import {
  filters,
  ClearFilterButton,
  AutoRefreshToggle,
  FilterContainer,
  FormattedId,
  Table,
  ColumnControls,
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

export const Route = createFileRoute("/core/react-table/column-filters")({
  component: RouteComponent,
});

// ~ Manual column definitions
// Using `getColumns` to infer all columns
import { type User } from "../../../community/fake-data";

const columnHelper = createColumnHelper<User>();
const columns = [
  columnHelper.accessor("first_name", {
    id: "first_name",
    filterFn: filters.string.includes.filterFn,
    meta: {
      Filter: (headerContext) => (
        <FilterContainer>
          <Label>
            <FormattedId headerContext={headerContext} />
            <span className="text-secondary ml-1">(string.includes)</span>
          </Label>
          <filters.string.includes.FilterInput headerContext={headerContext} />
          <ClearFilterButton headerContext={headerContext} />
        </FilterContainer>
      ),
    },
  }),
  columnHelper.accessor("last_name", {
    id: "last_name",
    filterFn: filters.string.inArrayDynamic.filterFn,
    meta: {
      Filter: (headerContext) => (
        <FilterContainer>
          <Label>
            <FormattedId headerContext={headerContext} />
            <span className="text-secondary ml-1">
              (string.includesDynamic)
            </span>
          </Label>
          <filters.string.inArrayDynamic.FilterInput
            headerContext={headerContext}
          />
          <ClearFilterButton headerContext={headerContext} />
        </FilterContainer>
      ),
    },
  }),
  columnHelper.accessor("age", {
    id: "age",
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
              <span className="text-secondary ml-1">(number.range)</span>
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
  columnHelper.accessor("join_date", {
    id: "join_date",
    filterFn: filters.date.range.filterFn,
    meta: {
      Filter: (headerContext) => (
        <FilterContainer>
          <Label>
            <FormattedId headerContext={headerContext} /> Range
            <span className="text-secondary ml-1">(date.range)</span>
          </Label>
          <filters.date.range.FilterInput headerContext={headerContext} />
          <ClearFilterButton headerContext={headerContext} />
        </FilterContainer>
      ),
    },
  }),
  columnHelper.accessor("street", {
    id: "street",
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
  columnHelper.accessor("city", {
    id: "city",
  }),
  columnHelper.accessor("state", {
    id: "state",
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
            <span className="text-secondary ml-1">(string.inArray)</span>
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
  columnHelper.accessor("states", {
    id: "states",
    filterFn: filters.array.includesAll.filterFn,
    meta: {
      Filter: (headerContext) => {
        // array of arrays of keys
        const optionsKeys = headerContext.column
          .getFacetedUniqueValues()
          .keys();

        // Flatten the arrays of keys
        const flattenedOptions = Array.from(optionsKeys).flat();

        // Remove duplicates and sort
        const uniqueOptions = [...new Set(flattenedOptions)].sort((a, b) =>
          a.localeCompare(b),
        );

        // Map to the options format.
        const options = uniqueOptions.map((option) => ({
          value: option,
          label: option,
        }));
        return (
          <FilterContainer>
            <Label>
              <FormattedId headerContext={headerContext} /> includes all:
              <span className="text-secondary ml-1">(array.includesAll)</span>
            </Label>
            <filters.array.includesAll.FilterInput
              headerContext={headerContext}
              inputProps={{
                className: createCn("max-h-[300px]"),
                // Full control over props passed to input
                // (other than those required to connect to
                // `headerContext.column.setFilterValue()`)
                options,
              }}
            />
            <ClearFilterButton headerContext={headerContext} />
          </FilterContainer>
        );
      },
    },
  }),
  columnHelper.accessor("zip", {
    id: "zip",
    filterFn: filters.string.includes.filterFn,
    meta: {
      Filter: (headerContext) => (
        <FilterContainer>
          <Label>
            <FormattedId headerContext={headerContext} />
            <span className="text-secondary ml-1">(string.includes)</span>
          </Label>
          <filters.string.includes.FilterInput headerContext={headerContext} />
          <ClearFilterButton headerContext={headerContext} />
        </FilterContainer>
      ),
    },
  }),
  columnHelper.accessor("phone", {
    id: "phone",
  }),
];

function RouteComponent() {
  const { data } = Route.useRouteContext();

  const [state, setState] = React.useState({
    // needed to set initial column order
    columnOrder: columns.map((col) => col.id!),
  });

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
        { th: () => ({ className: "bg-muted flex" }) },
      ],
    },
  );

  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="self-end">
        <ColumnControls {...{ table }} />
      </div>
      <Table {...{ table, virtualRows, componentProps }} />
    </div>
  );
}
