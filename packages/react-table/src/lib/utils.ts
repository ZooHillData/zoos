import { type TableState } from "@tanstack/react-table";

const getInitState = (state: Partial<TableState>) => state as TableState;

export { getInitState };
