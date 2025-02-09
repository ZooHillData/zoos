import {
  AlertDialog,
  AlertDialogOverlay,
  Dialog,
  DialogOverlay,
} from "@zoos/shadcn";

import {
  useDialog,
  closeDialog,
  useAlertDialog,
  closeAlertDialog,
} from "./dialog-store";

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

const ControlledAlertDialog = () => {
  const { isOpen, content } = useAlertDialog();

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeAlertDialog();
        }
      }}
    >
      <AlertDialogOverlay />
      {content}
    </AlertDialog>
  );
};

export { ControlledDialog, ControlledAlertDialog };
