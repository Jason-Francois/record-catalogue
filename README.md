# Record Catalogue

Record Catalogue is a small web app for browsing and managing an album collection. The repository contains two projects:

- `api/` — a Ruby on Rails JSON API backed by SQLite.
- `ui/` — a React, TypeScript, and Vite single-page app.

## Features

- Browse a paginated collection of records.
- Search by album title or artist, and filter by genre or release-year range.
- Add, edit, and delete records.
- Import records from a CSV file.
- Automatically look up album cover art through MusicBrainz and the Cover Art Archive. Cover lookups require an internet connection; records still work without a matching image.

## Requirements

- Ruby 3.2.7 and Bundler
- Node.js and npm

The API uses SQLite, included through its Ruby dependencies. No separate database server is needed.

## Run locally

Start the API first. In a terminal:

```sh
cd api
bundle install
bin/rails db:prepare
bin/rails db:seed
bin/rails server
```

The API is available at `http://localhost:3000`. The seed task creates 20 sample albums spanning several genres. It is safe to run again; existing seeded records are not duplicated.

In a second terminal, start the UI:

```sh
cd ui
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`). The development environment is already configured to use the API at `http://localhost:3000` in `ui/.env.development`. Set `VITE_API_URL` there if your API runs at a different address.

## CSV import

Use the **Upload CSV** control on the add-record form. The file must have these column headers:

```csv
title,artist_name,genre,release_year
Discovery,Daft Punk,Electronic,2001
```

## API overview

Records are exposed as JSON at `/records`:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/records` | List records; accepts `query`, `genre`, `year_from`, `year_to`, and `page` filters |
| `GET` | `/records/:id` | Get one record |
| `POST` | `/records` | Create a record |
| `PATCH` | `/records/:id` | Update a record |
| `DELETE` | `/records/:id` | Delete a record |
| `POST` | `/records/bulk_create` | Import a CSV file as multipart form data using the `file` field |

The list endpoint returns `records` and pagination metadata (`total_records`, `total_pages`, and `current_page`). It returns 12 records per page.

## Checks

Run the API tests from `api/`:

```sh
bin/rails test
```

Build and lint the UI from `ui/`:

```sh
npm run build
npm run lint
```
