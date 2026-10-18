export default interface RecordItem {
  id: number;
  title: string;
  artist_name: string;
  genre: string;
  release_year: number;
  image_url?: string;
}

export type NewRecord = Omit<RecordItem, "id" | "image_url">;
