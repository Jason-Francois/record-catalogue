import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import Button from "./Button";

export interface Item {
  id: string;
  label: string;
}

export interface MultiselectProps<T extends Item> {
  items: T[];
  buttonLabel: string;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function Multiselect<T extends Item>({
  items,
  buttonLabel,
  selectedIds,
  onChange,
}: MultiselectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedItems = items.filter((item) => selectedIds.includes(item.id));

  function toggleItem(id: string) {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    onChange(newSelected);
  }

  return (
    <div className="relative w-full">
      <Button
        variant="primary"
        fullSize
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="flex items-center justify-between gap-3">
          <span>{buttonLabel}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </Button>

      {selectedItems.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 w-full">
          {selectedItems.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-fg"
            >
              {item.label}
              <button
                type="button"
                aria-label={`Remove ${item.label}`}
                onClick={() => toggleItem(item.id)}
                className="rounded-full p-0.5 text-muted transition-colors hover:bg-primary/15 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
      )}

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close genre menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute left-0 top-full z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-line bg-surface p-1.5 shadow-xl">
            {items.length === 0 ? (
              <p className="px-3 py-4 text-center text-sm text-muted">
                No genres available.
              </p>
            ) : (
              items.map((item) => {
                const isSelected = selectedIds.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    onClick={() => toggleItem(item.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary ${
                      isSelected
                        ? "bg-primary/10 font-medium text-fg"
                        : "text-fg hover:bg-page"
                    }`}
                  >
                    <span>{item.label}</span>

                    <span
                      className={`flex size-4 shrink-0 items-center justify-center rounded border transition-colors ${
                        isSelected
                          ? "border-primary bg-primary text-on-primary"
                          : "border-line bg-page"
                      }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}
