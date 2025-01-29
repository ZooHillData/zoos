import { XIcon } from "lucide-react";

function RemoveItem({ onRemoveItem }: { onRemoveItem: () => void }) {
  return (
    <span
      onClick={onRemoveItem}
      className="absolute right-0 top-0 z-20 cursor-pointer p-1"
      title="Remove item"
    >
      <XIcon className="stroke-primary h-4 w-4" />
    </span>
  );
}

export { RemoveItem };
