import type {
  Cell,
  HeaderContext,
  Table as TTable,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { useVirtualization, type ComponentProps } from "@zoos/react-table";
import { HeaderContextMenu, HeaderSortIndicator } from "@zoos/react-table-ui";

import { CellContextMenu } from "./cell-context-menu";

const Table = <TData extends object, TValue>(props: {
  table: TTable<TData>;
  virtualRows: ReturnType<typeof useVirtualization>["virtualRows"];
  componentProps: ComponentProps<TData, TValue>;
}) => {
  const { table, virtualRows, componentProps } = props;

  return (
    <div {...componentProps.container}>
      <table {...componentProps.table}>
        {
          // ~ THEAD
        }
        <thead {...componentProps.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            // ~ Header row
            <tr
              key={headerGroup.id}
              {...componentProps.trHead?.({ headerGroup })}
            >
              {headerGroup.headers.map((header) => {
                return (
                  // ~ Header cell
                  <th
                    key={header.id}
                    {...componentProps.th?.({
                      headerContext: header.getContext() as HeaderContext<
                        TData,
                        TValue
                      >,
                    })}
                  >
                    <HeaderContextMenu
                      // Header context menu provides right click
                      header={header.getContext()}
                      className="flex w-full justify-between"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      <HeaderSortIndicator
                        // Sort indicator
                        header={header}
                        className="text-primary"
                        onClick={() => header.column.toggleSorting()}
                      />
                    </HeaderContextMenu>
                    <div
                      // Resize column handle
                      {...componentProps.resizeColHandle?.({
                        headerContext: header.getContext() as HeaderContext<
                          TData,
                          TValue
                        >,
                      })}
                    />
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        {
          // ~ TBODY
        }
        <tbody {...componentProps.tbody}>
          {virtualRows.map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              // ~ Data row
              <tr
                key={virtualRow.index}
                {...componentProps.trBody?.({ table, row, virtualRow })}
                // Custom row click handler
              >
                {
                  // ! Need this type hint to avoid TS error
                  row.getVisibleCells().map((cell) => {
                    return (
                      // ~ Data cell
                      <td
                        key={cell.id}
                        {...componentProps.td?.({
                          cell: cell as Cell<TData, TValue>,
                          virtualRow,
                        })}
                      >
                        <CellContextMenu row={row}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </CellContextMenu>
                      </td>
                    );
                  })
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
