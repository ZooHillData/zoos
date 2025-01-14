import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/file-browser/")({
  component: RouteComponent,
});

import React from "react";

import { type TableState } from "@tanstack/react-table";

import { FileBrowser } from "../../../features/file-browser";

import { files } from "./-data";

const filesSorted = files.sort((a, b) => a.path.localeCompare(b.path));

function RouteComponent() {
  const [state, setState] = React.useState({} as TableState);
  const [folder, setFolder] = React.useState("/");

  return (
    <FileBrowser
      files={filesSorted}
      state={state}
      onStateChange={setState}
      location={folder}
      onLocationChange={setFolder}
    />
  );
}
