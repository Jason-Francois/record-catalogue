import FileUpload from "./FileUpload";

export type RecordFormValues = {
  title: string;
  artist_name: string;
  genre: string;
  release_year: number;
};

type RecordFormProps = {
  initialValues?: Partial<RecordFormValues>;
  onSubmit: (values: RecordFormValues) => void | Promise<void>;
  submitLabel?: string;
};

const CURRENT_YEAR = new Date().getFullYear();

export default function RecordForm({
  initialValues,
  onSubmit,
  submitLabel = "Add Record",
}: RecordFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSubmit({
      title: String(formData.get("title") ?? ""),
      artist_name: String(formData.get("artist_name") ?? ""),
      genre: String(formData.get("genre") ?? ""),
      release_year: Number(formData.get("release_year")),
    });
    event.currentTarget.reset();
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
      <label htmlFor="genre" className="flex flex-col gap-1 font-bold">
        Genre
      </label>
      <input
        id="genre"
        type="text"
        placeholder="Genre"
        name="genre"
        className="rounded border border-line px-4 py-2"
        defaultValue={initialValues?.genre ?? ""}
      />
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
