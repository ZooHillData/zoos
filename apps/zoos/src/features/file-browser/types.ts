import { type TreeNode } from "@zoos/navigation";

type FileAttributes = {
  path: string;
  size: number;
  owner: string;
  last_updated: string;
};

type FileTreeNode = TreeNode<FileAttributes>;

export type { FileAttributes, FileTreeNode };
