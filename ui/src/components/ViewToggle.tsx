import Button from "./Button";

export interface ViewToggleProps {
  view: "grid" | "carousel";
  onViewChange: (view: "grid" | "carousel") => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <Button
      className="btn btn-secondary mb-4"
      onClick={() => onViewChange(view === "grid" ? "carousel" : "grid")}
    >
      {view === "grid" ? "Carousel View" : "Grid View"}
    </Button>
  );
}
