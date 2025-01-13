type RootNode<T> = {
  _leaf: string;
  _path: string;
  _children: PathNode<T>[];
  _type: "file" | "directory";
};

type PathNode<T> = T & RootNode<T>;

const buildPathTree =
  <T extends object>({ data }: { data: T[] }) =>
  ({ getParts }: { getParts: (row: T) => string[] }): RootNode<T> => {
    const root: RootNode<T> = {
      _leaf: "",
      _path: "/",
      _children: [],
      _type: "directory",
    };

    for (const row of data) {
      const parts = getParts(row).filter((part) => part);
      let currentNode = root;

      parts.forEach((part, index) => {
        const isFile = index === parts.length - 1 && !part.endsWith("/");
        const type = isFile ? "file" : "directory";

        let childNode = currentNode._children?.find(
          (child) => child._leaf === part,
        );

        if (!childNode) {
          childNode = {
            _leaf: part,
            _path: `${currentNode._path}${part}${type === "directory" ? "/" : ""}`,
            _type: type,
            ...row,
          } as PathNode<T>;

          if (type === "directory") {
            childNode._children = [];
          }

          currentNode._children?.push(childNode);
        }

        if (type === "directory") {
          currentNode = childNode;
        }
      });
    }

    return root;
  };

const searchPathTree = <T extends object>({
  node,
  isMatch,
}: {
  node: PathNode<T> | RootNode<T>;
  isMatch: (node: PathNode<T> | RootNode<T>) => boolean;
}): PathNode<T> | RootNode<T> | undefined => {
  if (isMatch(node)) {
    return node;
  }

  for (const child of node._children || []) {
    const result = searchPathTree({ node: child, isMatch });
    if (result) {
      return result;
    }
  }
};

export { buildPathTree, searchPathTree, type PathNode };
