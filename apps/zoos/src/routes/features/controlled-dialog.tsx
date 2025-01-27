import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/controlled-dialog")({
  component: RouteComponent,
});

import {
  Button,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@zoos/shadcn";

/*
 Controlled dialog is in lib instead of features because
 many of the features use the controlled dialog

 All features should be fully independent of each other, 
 though they can use functionality from `lib`
 */
import { openDialog } from "../../lib/dialog";

function RouteComponent() {
  return (
    <Button
      className="m-auto"
      onClick={() =>
        openDialog({
          content: (
            <DialogContent className="w-fit">
              <DialogHeader>
                <DialogTitle>Title</DialogTitle>
                <DialogDescription>Description</DialogDescription>
              </DialogHeader>
              <div className="bg-primary flex h-[200px] w-[200px] items-center justify-center">
                Content
              </div>
            </DialogContent>
          ),
        })
      }
    >
      Open Dialog
    </Button>
  );
}
