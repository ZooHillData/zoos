import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

///
/// Route Component
///

import React from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  buttonVariants,
  cn,
} from "@zoos/ui-shad";

import alex from "../assets/alex-snail.svg";
import bryce from "../assets/bryce-dolphin.svg";
import borst from "../assets/borst-turtle.svg";

function RouteComponent() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-background text-foreground flex h-screen w-screen flex-col items-center justify-center gap-2">
      <h1 className="text-6xl font-bold">Zoos</h1>
      <h2 className="text-2xl font-semibold">The "ShadCN" of Tanstack</h2>
      <div className="flex items-center">
        <a
          className={cn(buttonVariants({ variant: "link" }), "h-fit py-0")}
          href="https://github.com/ZooHillData/zoos/discussions/new?category=ideas"
        >
          Ideas, Feedback, Bugs
        </a>
        <div className="h-full border" />
        <a
          className={cn(buttonVariants({ variant: "link" }), "h-fit py-0")}
          href="https://www.npmjs.com/~alexryanterry"
        >
          NPM Packages
        </a>
      </div>
      <div className="flex w-full flex-wrap items-center justify-around">
        <img src={borst} alt="Borst Turtle" className="h-96 w-96" />
        <img src={alex} alt="Alex Snail" className="h-96 w-96" />
        <img src={bryce} alt="Bryce Dolphin" className="h-96 w-96" />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Get Started</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thank you for your patience</DialogTitle>
            <DialogDescription>
              We are still working on this. Please check back soon!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Ok</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
