import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/core/react-grid-layout/")({
  component: RouteComponent,
});

import type { Layout } from "react-grid-layout";

import React from "react";
import { Button } from "@zoos/shadcn";

import {
  GridItem,
  GridLayout,
  addItemToLayout,
  deleteItemFromLayout,
} from "@zoos/react-grid-layout";

function RouteComponent() {
  const [layout, setLayout] = React.useState<Layout[]>([
    { i: "1", x: 0, y: 0, w: 4, h: 4 },
  ]);

  return (
    <div className="flex h-screen w-screen gap-2">
      <div className="space-y-2 p-2">
        <Button
          className="sticky top-0 w-full"
          onClick={() => {
            const newLayout = addItemToLayout({
              item: { x: 0, y: 0, w: 4, h: 4 },
              layout,
            });
            setLayout(newLayout);
          }}
        >
          Add To Layout
        </Button>
        <pre className="bg-muted w-[225px] rounded p-2">
          {`[${["x", "y", "width", "height"].join(",")}]\n`}
          {layout.map(
            (item) => JSON.stringify([item.x, item.y, item.w, item.h]) + "\n",
          )}
        </pre>
      </div>
      <GridLayout layout={layout} onLayoutChange={setLayout}>
        {layout.map((item) => (
          <GridItem key={item.i} item={item}>
            <div className="bg-accent flex h-full w-full items-center justify-center">
              {item.i}
            </div>
          </GridItem>
        ))}
      </GridLayout>
    </div>
  );
}
