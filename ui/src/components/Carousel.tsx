import { useState } from "react";
import type RecordItem from "../types/record";
import { Disc3 } from "lucide-react";
import { Link } from "react-router";

const CAROUSEL_SIZE = 5;
export interface CarouselProps {
  items: RecordItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [activeItem, setActiveItem] = useState(items[selectedIndex]);

  const visibleRecords = items.slice(
    Math.max(0, selectedIndex - Math.floor(CAROUSEL_SIZE / 2)),
    Math.min(items.length, selectedIndex + Math.floor(CAROUSEL_SIZE / 2) + 1),
  );

  const positionClasses = [
    "carousel-item--far-left",
    "carousel-item--left",
    "carousel-item--center",
    "carousel-item--right",
    "carousel-item--far-right",
  ];
  return (
    <div className="carousel-container flex flex-col">
      <div className="carousel w-full flex justify-center">
        {visibleRecords.map((item, index) => (
          <Link
            className={`carousel-item ${positionClasses[index]}`}
            to={`/records/${item.id}`}
          >
            <div
              key={item.id}
              onMouseOver={() => {
                // Update selected index (based on items)
                setActiveItem(visibleRecords[index]);
              }}
            >
              {item?.image_url ? (
                <img src={item.image_url} alt={item.title} />
              ) : (
                <Disc3 className="absolute inset-0 m-auto size-24 bg-surface w-full h-full" />
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="carousel-info text-center mt-6">
        <h2 className="text-xl font-semibold">{activeItem?.title}</h2>
        <p className="text-base">{activeItem?.artist_name}</p>
      </div>
      <div className="carousel-controls flex justify-center gap-4 my-4">
        <button
          aria-label="Previous item"
          className="min-w-10 h-10 px-3 rounded-md border border-line bg-surface text-fg cursor-pointer transition-colors hover:bg-line focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface"
          onClick={() => {
            const newIndex = Math.max(0, selectedIndex - 1);
            setSelectedIndex(newIndex);
            setActiveItem(items[newIndex]);
          }}
        >
          &lsaquo;
        </button>
        <button
          aria-label="Next item"
          className="min-w-10 h-10 px-3 rounded-md border border-line bg-surface text-fg cursor-pointer transition-colors hover:bg-line focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface"
          onClick={() => {
            const newIndex = Math.min(items.length - 1, selectedIndex + 1);
            setSelectedIndex(newIndex);
            setActiveItem(items[newIndex]);
          }}
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
}
