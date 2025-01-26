import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/file-browser/")({
  component: RouteComponent,
});

import React from "react";

import { shuffle } from "remeda";

import { FileBrowser, ownerOptions } from "../../../features/file-browser";
import { files } from "./-data";

const pickRandomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];
const pickRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const pickMultipleRandomElements = (arr: string[]) => {
  const len = pickRandomNumber(1, arr.length);
  const result = shuffle(arr).slice(0, len);
  return result;
};

const filesSorted = files
  .map((file) => ({
    ...file,
    owner: pickRandomElement(ownerOptions),
    read: pickMultipleRandomElements(ownerOptions),
    write: pickMultipleRandomElements(ownerOptions),
    manage: pickMultipleRandomElements(ownerOptions),
  }))
  .sort((a, b) => a.path.localeCompare(b.path));

function RouteComponent() {
  const [state, setState] = React.useState({});
  const [folder, setFolder] = React.useState("/");

  return (
    <FileBrowser
      files={filesSorted}
      state={state}
      onStateChange={setState}
      location={folder}
      onLocationChange={setFolder}
      tableOptions={{
        initialState: {
          columnVisibility: { full_path: false, write: false, manage: false },
        },
      }}
    />
  );
}
