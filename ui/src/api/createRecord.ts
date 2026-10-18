import type RecordItem from "../types/record";
import { API_URL } from "../config";
import { postJson, postFile } from "./client";
import type { NewRecord } from "../types/record";

// Rails' `params.expect(record: [...])` needs the fields nested under `record`
export default function createRecord(data: NewRecord) {
  return postJson<RecordItem>(`${API_URL}/records`, {
    record: {
      title: data.title,
      artist_name: data.artist_name,
      release_year: data.release_year,
    },
    genre_ids: data.genre_ids.map(Number),
  });
}

export function bulkCreateRecord(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return postFile(`${API_URL}/records/bulk_create`, file);
}
