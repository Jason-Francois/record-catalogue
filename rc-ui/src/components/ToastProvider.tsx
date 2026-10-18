import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { ToastContext, type ToastType } from "../context/toastContext";

const DISMISS_AFTER_MS = 4000;

type Toast = { id: number; message: string; type: ToastType };

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const nextId = useRef(0);

  const dismiss = useCallback(() => {
    window.clearTimeout(timer.current);
    setToast(null);
  }, []);

  const showToast = useCallback((message: string, type: ToastType) => {
    window.clearTimeout(timer.current);
    // A new id remounts the toast so the drop-down animation replays
    setToast({ id: nextId.current++, message, type });
    timer.current = window.setTimeout(() => setToast(null), DISMISS_AFTER_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
          <div
            key={toast.id}
            role={toast.type === "error" ? "alert" : "status"}
            className={`pointer-events-auto flex animate-toast-in items-center gap-3 rounded-lg px-4 py-3 font-semibold text-white shadow-lg ${
              toast.type === "success" ? "bg-success" : "bg-danger"
            }`}
          >
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss notification"
              className="rounded p-1 hover:bg-black/20 focus-visible:outline-2 focus-visible:outline-white"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
