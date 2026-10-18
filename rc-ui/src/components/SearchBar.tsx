import { Search } from "lucide-react";
import { Form, useSearchParams, useSubmit } from "react-router";

export default function SearchBar() {
  const [params] = useSearchParams();

  const submit = useSubmit();

  return (
    <Form
      method="get"
      role="search"
      className="mb-8 flex flex-col gap-4"

      onChange={(event) => {
        const form = event.currentTarget;
        setTimeout(() => {
          console.log("Query value:", form.query.value);
          submit(form);
        }, 300);
      }}
    >
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          className="py-3 pl-12 pr-4 w-full bg-surface border border-line text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm rounded-lg"
          type="search"
          aria-label="Search records"
          placeholder="Enter record name"
          name="query"
          defaultValue={params.get("query") ?? ""}
        />
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="genre"
            className="text-xs uppercase tracking-wide text-muted font-semibold"
          >
            Genre
          </label>
          <select
            id="genre"
            className="px-2 h-10 bg-surface border border-line text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm rounded-lg"
            name="genre"
            defaultValue={params.get("genre") ?? ""}
          >
            <option value="">All</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="jazz">Jazz</option>
          </select>
        </div>
        <div
          className="flex flex-col gap-2"
          role="group"
          aria-labelledby="year-label"
        >
          <span
            id="year-label"
            className="font-semibold text-xs uppercase tracking-wide text-muted"
          >
            Year
          </span>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="From"
              aria-label="Year from"
              className="w-20 px-2 h-10 bg-surface border border-line text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm rounded-lg"
              name="year_from"
              defaultValue={params.get("year_from") ?? ""}
            />
            <span className="self-center">—</span>
            <input
              type="number"
              placeholder="To"
              aria-label="Year to"
              className="w-20 px-2 h-10 bg-surface border border-line text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm rounded-lg"
              name="year_to"
              defaultValue={params.get("year_to") ?? ""}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}
