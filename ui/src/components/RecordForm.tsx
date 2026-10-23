import FileUpload from "./FileUpload";
import type Genre from "../types/genre";
import MultiSelect from "./Multiselect";
import { useState } from "react";
export type RecordFormValues = {
  title: string;
  artist_name: string;
  genre_ids: number[];
  release_year: number;
};

type RecordFormProps = {
  initialValues?: Partial<RecordFormValues>;
  onSubmit: (values: RecordFormValues) => void | Promise<void>;
  submitLabel?: string;
  genres: Genre[];
};

const CURRENT_YEAR = new Date().getFullYear();

export default function RecordForm({
  initialValues,
  onSubmit,
  submitLabel = "Add Record",
  genres,
}: RecordFormProps) {
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>(
    (initialValues?.genre_ids ?? []).map(String),
  );
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    debugger;
    onSubmit({
      title: String(formData.get("title") ?? ""),
      artist_name: String(formData.get("artist_name") ?? ""),
      genre_ids: selectedGenreIds.map(Number),
      release_year: Number(formData.get("release_year")),
    });
    event.currentTarget.reset();
    setSelectedGenreIds([]);
  }

  return (
    <form
      className="mt-4 flex flex-col gap-4 bg-surface p-8 rounded"
      onSubmit={handleSubmit}
    >
      <label htmlFor="title" className="flex flex-col gap-1 font-bold">
        Record Title
      </label>
      <input
        id="title"
        type="text"
        placeholder="Record Title"
        name="title"
        className="rounded border border-line px-4 py-2"
        defaultValue={initialValues?.title ?? ""}
      />
      <label htmlFor="artist_name" className="flex flex-col gap-1 font-bold">
        Artist
      </label>
      <input
        id="artist_name"
        type="text"
        placeholder="Artist"
        name="artist_name"
        className="rounded border border-line px-4 py-2"
        defaultValue={initialValues?.artist_name ?? ""}
      />
      <label className="flex flex-col gap-1 font-bold">
        Genres
        <MultiSelect
          items={genres.map((genre) => ({
            id: String(genre.id),
            label: genre.name,
          }))}
          buttonLabel="Select genres"
          selectedIds={selectedGenreIds}
          onChange={setSelectedGenreIds}
        />
      </label>
      <label htmlFor="release_year" className="flex flex-col gap-1 font-bold">
        Release Year
      </label>
      <select
        id="release_year"
        name="release_year"
        className="rounded border border-line px-4 py-2"
        defaultValue={initialValues?.release_year ?? CURRENT_YEAR}
      >
        {Array.from({ length: CURRENT_YEAR - 1899 }, (_, i) => 1900 + i).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ),
        )}
      </select>
      <button
        type="submit"
        className="rounded bg-primary px-4 py-2 font-bold text-white"
      >
        {submitLabel}
      </button>
      <div className="flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-line" />
        or import many at once
        <span className="h-px flex-1 bg-line" />
      </div>
      <FileUpload />
      <p className="text-center text-sm text-muted">
        CSV columns: title, artist_name, genre, release_year
      </p>
    </form>
  );
}
