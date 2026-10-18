import type Genre from "../types/genre";
import { getJson } from "./client";
import { API_URL } from "../config";
export interface NewRecordLoaderResponse {
  genres: Genre[];
}

export default function newRecordLoader() {
  return getJson<Genre[]>(`${API_URL}/genres`);
}
