import { type Layout } from "react-grid-layout";

type Item = Omit<Layout, "i">;

/**
 *
 * Adds a new item to a layout array
 * @param item a single item (without i), e.g. { x: 0, y: 0, w: 4, h: 4 }
 * @param layout existing layout array
 * @param algo either a pre-built string or a custom function
 * @returns the updated layout array
 */
const addItemToLayout = ({
  item,
  layout = [],
  algo = "end",
}: {
  item: Item;
  layout?: Layout[];
  // Algo can be a standard or a custom function
  algo?: "end" | ((item: Item, layout: Layout[]) => Layout[]);
}) => {
  const maxI = layout.reduce((max: number, layout: Layout) => {
    return Math.max(max, parseInt(layout.i));
  }, 0);

  // Since items can be deleted, we need to find max i
  // (not just layout.length + 1)
  // const maxI = !layout.length
  //   ? 0
  //   : layout.reduce((max: number, layout: Layout) => {
  //       const num = parseInt(i);
  //       return isNaN(num) ? max : Math.max(max, num);
  //     });
  // : collect(layout)
  //     .map((item) => ({ i: parseInt(item.i) }))
  //     .max("i");
  const newLayoutItem = {
    i: `${maxI + 1}`,
    ...item,
  };

  if (typeof algo === "function") {
    return algo(item, layout);
  } else if (algo === "end") {
    return [...layout, newLayoutItem];
  }
  throw new Error(`Unknown algo: ${algo}`);
};

/** Removes an item from an existing layout array by `i` */
function deleteItemFromLayout({
  i,
  layout = [],
}: {
  i: string;
  layout: Layout[];
}) {
  return layout.filter((item) => item.i !== i);
}

export { addItemToLayout, deleteItemFromLayout };
