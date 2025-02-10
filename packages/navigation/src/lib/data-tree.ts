type NodeData<T> = {
  _dataTree: {
    leaf: string;
    pathStr: string;
    children: TreeNode<T>[];
  };
};

type TreeNode<T> = T & NodeData<T>;

const getDataTree =
  <T extends object, FieldId extends string>({ data }: { data: T[] }) =>
  ({
    getPath,
  }: {
    // `getPath` is called on each row to get the path to the row
    // in the hierarchy. e.g. ["main_dir", "sub_dir", "file.txt"]
    // place this row in the hierarchy at "/main_dir/sub_dir/file.txt"
    getPath: (row: T) => string[];
    // `fieldId` the field this function will store the tree-related
    // attributes, e.g. `children`, `full_path`
    fieldId?: FieldId;
  }): NodeData<T> => {
    const root: NodeData<T> = {
      _dataTree: {
        leaf: "",
        pathStr: "/",
        children: [],
      },
    };

    for (const row of data) {
      const parts = getPath(row).filter((part) => part);
      let currentNode = root;

      parts.forEach((part, index) => {
        const isFile = index === parts.length - 1 && !part.endsWith("/");
        const type = isFile ? "file" : "directory";

        let childNode = currentNode._dataTree.children?.find(
          (child) => child._dataTree.leaf === part,
        );

        if (!childNode) {
          childNode = {
            _dataTree: {
              leaf: part,
              pathStr: `${currentNode._dataTree.pathStr}${part}${type === "directory" ? "/" : ""}`,
            },
            ...row,
          } as TreeNode<T>;

          if (type === "directory") {
            childNode._dataTree.children = [];
          }

          currentNode._dataTree.children?.push(childNode);
        }

        if (type === "directory") {
          currentNode = childNode;
        }
      });
    }

    return root;
  };

const searchDataTree = <T extends object>({
  node,
  isMatch,
}: {
  node: TreeNode<T> | NodeData<T>;
  isMatch: (node: TreeNode<T> | NodeData<T>) => boolean;
}): TreeNode<T> | NodeData<T> | undefined => {
  if (isMatch(node)) {
    return node;
  }

  for (const child of node._dataTree.children || []) {
    const result = searchDataTree({ node: child, isMatch });
    if (result) {
      return result;
    }
  }
};

/** Strips the extra data-tree data and returns the original object */
const getBaseObject = <T extends object>(
  node: TreeNode<T> | NodeData<T>,
): T => {
  const { _dataTree, ...rest } = node;
  return rest as T;
};

export { getDataTree, searchDataTree, getBaseObject };
export type { NodeData, TreeNode };
