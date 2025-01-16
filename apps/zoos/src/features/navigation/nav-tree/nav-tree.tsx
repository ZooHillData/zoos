import type { ColumnDef, Table } from "@tanstack/react-table";

import React from "react";

import { flexRender } from "@tanstack/react-table";
import { CopyPlusIcon, CopyMinusIcon } from "lucide-react";

import { InputDebounce } from "@zoos/react-form";

import { useNavTree } from "./use-nav-tree";

const NavTreeControls = <T,>({
  table,
  className,
}: {
  table: Table<T>;
  className: string;
}) => {
  return (
    <div className={className}>
      <button
        onClick={() => table.toggleAllRowsExpanded(true)}
        className="hover:text-primary"
      >
        <CopyPlusIcon className="size-3" />
      </button>
      <button
        onClick={() => table.toggleAllRowsExpanded(false)}
        className="hover:text-primary"
      >
        <CopyMinusIcon className="size-3" />
      </button>
    </div>
  );
};

const NavTree = <T extends object>(props: {
  className: string;
  table: Table<T>;
}) => {
  return (
    <div className={props.className}>
      {props.table.getRowModel().rows.map((row) => {
        // ! This is dumb
        // ! is there no `row.getCell()`
        const cell = row
          .getAllCells()
          .find((cell) => cell.column.id === "leaf");
        if (!cell) return null;
        return flexRender(cell?.column.columnDef.cell, cell?.getContext());
      })}
    </div>
  );
};

const NavTreeSearch = <T extends object>({
  table,
  delay = 300,
  ...inputProps
}: { table: Table<T> } & Omit<
  React.ComponentProps<typeof InputDebounce>,
  "onChange" | "value" | "delay"
> & { delay?: number }) => {
  return (
    <InputDebounce
      placeholder="Search features"
      value={table.getState().globalFilter || ""}
      onChange={(value) => table.setGlobalFilter(value)}
      delay={300}
      {...inputProps}
    />
  );
};

export { NavTreeSearch, NavTreeControls, NavTree };
