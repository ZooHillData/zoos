import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/get-started")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 pt-16">
      <h1 className="text-6xl font-bold">Get Started</h1>
      <h2 className="text-2xl font-semibold">Quick Start</h2>
      <ol className="list-decimal space-y-1 pl-6">
        <li>Find the feature you want using the left navigation</li>
        <li>
          Find the corresponding route in GH repo, copy-paste into your app
          (installing required packages)
        </li>
        <li>Customize as needed in your app</li>
      </ol>
    </div>
  );
}
