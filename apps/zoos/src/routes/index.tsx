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
import brian from "../assets/brian-monkey.svg";

const Icons = () => (
  <div className="mx-auto flex w-fit flex-wrap items-center gap-x-8">
    <img src={alex} alt="Alex Snail" className="h-24 w-24" />
    <img src={bryce} alt="Bryce Dolphin" className="h-24 w-24" />
    <img src={brian} alt="Brian Monkey" className="h-24 w-24" />
    <img src={borst} alt="Borst Turtle" className="h-24 w-24" />
  </div>
);

const GetStartedButton = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
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
  );
};

const Links = () => (
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
);

function RouteComponent() {
  return (
    <div className="bg-background text-foreground flex h-screen w-screen flex-col items-center gap-8 overflow-auto">
      <div className="mt-auto flex flex-col items-center gap-4">
        <h1 className="text-6xl font-bold">Zoos</h1>
        <Links />
        <p className="max-w-[400px] text-balance text-center text-sm italic">
          Simple, composable React libraries to help take advantage of our top
          Tanstack, ShadCN, Zustand, Supabase patterns.
        </p>
        <GetStartedButton />
      </div>
      <div className="mt-auto">
        <Icons />
      </div>
    </div>
  );
}
