import { AccessorColumnDef } from "@tanstack/react-table";
import type { Object } from "../types";

const formatDate = (date: Date) => {
  const pad = (num: number) => String(num).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const columnOverrides: { [key: string]: Partial<AccessorColumnDef<Object>> } = {
  object_data: {
    accessorFn: (row) => JSON.stringify(row.object_data),
  },
  created_at: {
    accessorFn: (row) => formatDate(row.created_at),
  },
  updated_at: {
    accessorFn: (row) => formatDate(row.last_updated_at),
  },
  metadata: {
    accessorFn: (row) => JSON.stringify(row.metadata),
  },
};

const extraColumns: AccessorColumnDef<Object>[] = [
  {
    id: "folder_path",
    accessorFn: (row) => row.objects_folders?.path,
  },
  {
    id: "version_history",
    accessorFn: (row) =>
      row.objects_history.length > 0
        ? `${row.objects_history.length} versions`
        : "",
  },
];

export { columnOverrides, extraColumns };
