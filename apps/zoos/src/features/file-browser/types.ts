import { type TreeNode } from "@zoos/navigation";

type FileAttributes = {
  path: string;
  size: number;
  owner: string;
  last_updated: string;
};

type FileAttributesWithPermissions = FileAttributes & {
  read: string[];
  write: string[];
  manage: string[];
};

type FileTreeNode = TreeNode<FileAttributes>;

export type { FileAttributesWithPermissions, FileAttributes, FileTreeNode };
