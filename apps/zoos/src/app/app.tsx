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
} from "@zoos/ui-shad";

import alex from "~/assets/alex-snail.svg";
import bryce from "~/assets/bryce-dolphin.svg";
import borst from "~/assets/borst-turtle.svg";

export function App() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-background text-foreground flex h-screen w-screen flex-col items-center justify-center gap-2">
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

export default App;
