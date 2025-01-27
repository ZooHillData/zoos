import { Dialog, DialogOverlay } from "@zoos/shadcn";

import { useDialog, closeDialog } from "./dialog-store";

const ControlledDialog = () => {
  const { isOpen, content } = useDialog();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeDialog();
        }
      }}
    >
      <DialogOverlay />
      {content}
    </Dialog>
  );
};

export { ControlledDialog };
