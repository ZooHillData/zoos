import { type HeaderContext, type Row } from "@tanstack/react-table";
import { Badge, createCn, Input } from "@zoos/shadcn";
import { X } from "lucide-react";
import React from "react";

type FilterTextInputProps = {
  inputClassName?: string;
  onEnter?: (value: string) => void;
};

const FilterTextInput = ({ inputClassName, onEnter }: FilterTextInputProps) => {
  const [query, setQuery] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (onEnter) {
        onEnter(query);
      }
      setQuery("");
    }
  };

  return (
    <Input
      className={inputClassName}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

interface FilterInputComponentProps<TData, TValue> {
  headerContext: HeaderContext<TData, TValue>;
  inputProps?: FilterTextInputProps;
}

const FilterInput = <TData, TValue>({
  headerContext: { column },
  inputProps,
}: FilterInputComponentProps<TData, TValue>) => {
  const filterValue = (column.getFilterValue() || []) as string[];

  const handleEnter = (value: string) => {
    const trimmed = value.trim();
    if (trimmed !== "" && !filterValue.includes(trimmed)) {
      const newFilterValue = [...filterValue, trimmed];
      column.setFilterValue(newFilterValue);
    }
  };

  const deleteItem = (indexToRemove: number) => {
    const newFilterValues = filterValue.filter((value, currentIndex) => {
      return currentIndex !== indexToRemove;
    });

    column.setFilterValue(newFilterValues);
  };

  return (
    <div>
      <FilterTextInput {...inputProps} onEnter={handleEnter} />
      {filterValue.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filterValue.map((val, index) => (
            <Badge key={index} variant="secondary" className="py-1 pl-3 pr-1">
              {val}
              <button
                onClick={() => deleteItem(index)}
                className="hover:bg-secondary-foreground/20 ml-2 rounded-full p-1 transition-colors"
                aria-label={`Delete ${val}`}
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

const filterFn = <TData,>(
  row: Row<TData>,
  columnId: string,
  filterValue: string[] | undefined,
) => {
  if (!filterValue || filterValue.length === 0) return true;
  const cellValue = row.getValue<string>(columnId);
  // Returns true if any of the filter strings is found within the cell's value.
  return filterValue.some((term) =>
    cellValue.toLowerCase().includes(term.toLowerCase()),
  );
};

export { FilterInput, filterFn };
