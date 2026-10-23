import type Genre from "./genre";

export default interface RecordItem {
  id: number;
  title: string;
  artist_name: string;
  genres: Genre[];
  release_year: number;
  image_url?: string;
}
// The payload sent when creating a record.
// Genres are referenced by their database IDs.
export type NewRecord = {
  title: string;
  artist_name: string;
  release_year: number;
  genre_ids: number[];
};
