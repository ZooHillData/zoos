import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/objects/scratch")({
  component: RouteComponent,
});

import React from "react";
import { getClient } from "../../../lib/supabase";

function RouteComponent() {
  React.useEffect(() => {
    getClient()
      .schema("zoos")
      .from("objects")
      .select(
        `
        *,
        objects_folders(path),
        objects_history(
            updated_at,
            update_email,
            tag
        )
        `,
      )
      .then((response) => console.log(response));
  }, []);
  return <div>Hello "/features/objects/scratch"!</div>;
}
