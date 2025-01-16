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
} from "@zoos/shadcn";

import { TheZoo, ZoosLogo } from "../features/components";

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

const HeaderGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-4">{children}</div>
);

const Description = ({ children }: { children: React.ReactNode }) => (
  <p className="max-w-[400px] text-pretty text-center text-sm italic">
    {children}
  </p>
);

import {
  AlexSnail,
  BrianMonkey,
  BorstTurtle,
  BryceDolphin,
} from "../features/components/the-zoo";

const products = [
  <AlexSnail />,
  <BorstTurtle />,
  <BrianMonkey />,
  <BryceDolphin />,
];

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const AutoplayCarousel = (props: { components: React.ReactNode[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ playOnInit: true, speed: 1 }),
  ]);

  return (
    <div className="w-full" ref={emblaRef}>
      <div className="-ml-4 flex touch-pan-y touch-pinch-zoom">
        {props.components.map((component, index) => (
          <div
            className="h-[10rem] w-[40%] min-w-0 flex-shrink-0 translate-x-0 translate-y-0 transform pl-4"
            key={index}
          >
            <div className="size-20">{component}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

function RouteComponent() {
  return (
    <div className="flex h-screen w-full flex-col items-center gap-8 overflow-auto py-8">
      <div className="m-auto flex max-w-[500px] flex-col gap-4">
        <div>
          <ZoosLogo />
        </div>
        <p className="text-6xl font-bold">
          Deploy apps <span className="text-primary text-pretty">fast</span>
        </p>
        <p>
          Zoos is an experiment in building{" "}
          <strong className="italic">and maintaining</strong> React applications
          as efficiently as possible.
        </p>
        <p>
          It is currently a collection of React libraries, patterns and examples
          centered around Tanstack, Radix / Tailwind (Shadcn) and Supabase.
        </p>
        <Button className="w-fit">Explore Features</Button>
        {/* <div className="mt-8 flex flex-wrap gap-8">
          <TheZoo />
        </div> */}
        <div className="mt-16 overflow-hidden p-2">
          <AutoplayCarousel components={products} />
        </div>
        {/* <Links /> */}
      </div>
    </div>
  );
}
