import { Disc3 } from "lucide-react";
import type RecordItem from "../types/record";
import { useState } from "react";
import ButtonLink from "./ButtonLink";
import type Genre from "../types/genre";
import { Link } from "react-router";

interface RecordCardProps {
  record: RecordItem;
}
export default function RecordCard({ record }: RecordCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  return (
    <li className="record-card overflow-hidden rounded-lg border border-line bg-surface transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-square bg-primary/10 text-primary/40">
        {/* placeholder sits behind */}
        <Disc3 className="absolute inset-0 m-auto size-24" />

        {record.image_url && !hasError && (
          <Link to={`/records/${record.id}`}>
            <img
              src={record.image_url}
              alt={record.title}
              loading="lazy"
              decoding="async"
              onLoad={() => setIsLoaded(true)}
              onError={() => {
                console.error(
                  `Cover at url ${record.image_url} failed to load`,
                );
                setHasError(true);
              }}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>
        )}
      </div>
      <div className="p-4">
        <h2 className="font-display text-lg">{record.title}</h2>
        <p className="text-sm text-muted">{record.artist_name}</p>
        <p className="text-muted">{record.release_year}</p>
        <div className="mt-3 flex items-center justify-between text-xs">
          {record.genres.map((genre: Genre) => {
            return (
              <span
                key={genre.id}
                className="rounded-full bg-primary/10 px-2 py-1 text-primary"
              >
                {genre.name}
              </span>
            );
          })}
          <ButtonLink
            variant="secondary"
            size="small"
            to={`/records/${record.id}`}
          >
            Edit
          </ButtonLink>
        </div>
      </div>
    </li>
  );
}
