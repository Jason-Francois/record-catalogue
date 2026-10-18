import { useEffect, useRef } from "react";
import Button from "./Button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  isBusy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Yes",
  isBusy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // The native <dialog> handles focus trapping, Escape and the backdrop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        if (!isBusy) onCancel();
      }}
      className="m-auto w-full max-w-sm rounded-lg border border-line bg-surface p-6 text-fg shadow-lg backdrop:bg-black/50"
    >
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-2 text-muted">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {isBusy ? "Deleting..." : confirmLabel}
        </Button>
      </div>
    </dialog>
  );
}
