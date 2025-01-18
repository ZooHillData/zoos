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

const MountainSvg = (props: { className?: string }) => (
  <svg
    className={cn("h-full w-full", props.className)}
    width="4202"
    height="816"
    viewBox="0 0 4202 816"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3061 689.595C3061 689.595 2641.28 494.539 2638.73 491.835C2636.19 489.131 2613.32 493.167 2605.69 491.835C2598.06 490.503 2536.22 443.404 2532.82 440.7C2529.44 437.996 2509.94 442.031 2494.69 460.879C2479.44 479.727 2473.52 452.807 2470.98 456.843C2468.43 460.879 2444.72 502.57 2443.02 497.203C2441.31 491.835 2429.47 499.907 2424.38 497.203C2419.3 494.499 2382.88 459.547 2364.22 444.736C2345.59 429.924 2330.34 435.332 2296.43 428.592C2262.55 421.852 2212.55 394.973 2204.09 390.937C2195.62 386.901 2165.12 409.784 2139.37 416.484C2113.63 423.224 2104.12 404.376 2091.41 405.708C2063.45 408.654 2027.87 389.565 2018.08 384.197C2008.29 378.829 1910.61 338.47 1910.61 338.47L1634.73 80.1707L1577.11 0.0172415C1577.11 0.0172415 1522.89 20.9637 1497.47 4.81999C1472.05 -11.3237 1434.77 18.2596 1434.77 18.2596C1434.77 18.2596 1360.22 47.8429 1328.01 63.9866C1295.81 80.1303 1243.29 150.073 1243.29 150.073L1175.5 202.54H1084L893.5 263.5L0.5 816H1084H3061H3304.5L3061 689.555V689.595Z"
      fill="url(#paint0_linear_65_8205)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_65_8205"
        x1="2072.5"
        y1="0"
        x2="2072.5"
        y2="816"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const Hero = () => (
  <div className="z-10 space-y-4">
    <p className="text-6xl font-bold">
      Deploy apps <span className="text-primary text-pretty">fast</span>
    </p>
    <p>
      Zoos is an experiment in building{" "}
      <strong className="italic">and maintaining</strong> React applications as
      efficiently as possible.
    </p>
    <p>
      It is currently a collection of React libraries, patterns and examples
      centered around Tanstack, Radix / Tailwind (Shadcn) and Supabase.
    </p>
    <Button className="w-fit">Get Started</Button>
  </div>
);

function RouteComponent() {
  return (
    <div className="flex h-screen w-full flex-col items-center gap-8 overflow-auto py-8">
      <div className="m-auto flex max-w-[500px] flex-col gap-4">
        <div>
          <ZoosLogo />
        </div>
        <Hero />
        <MountainSvg className="absolute left-0 top-0 -translate-y-[10%] translate-x-[23%] opacity-20" />

        {/* <div className="mt-8 flex flex-wrap gap-8">

          <TheZoo />
        </div> */}
        <div className="mt-8 overflow-hidden p-2">
          <AutoplayCarousel components={products} />
        </div>
        {/* <Links /> */}
      </div>
    </div>
  );
}
