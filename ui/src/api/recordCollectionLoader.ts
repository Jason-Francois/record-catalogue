import type RecordItem from "../types/record";
import type Genre from "../types/genre";
import { getJson } from "./client";
import { API_URL } from "../config";
import type { LoaderFunctionArgs } from "react-router";
const FILTER_KEYS = ["query", "year_from", "year_to", "page", "view", "genres"];

interface RecordCollectionResponse {
  records: RecordItem[];
  pagination: Pagination;
}

export interface RecordCollectionLoaderResponse extends RecordCollectionResponse {
  genres: Genre[];
}

export interface Pagination {
  total_records: number;
  total_pages: number;
  current_page: number;
}
export default async function recordCollectionLoader({
  request,
}: LoaderFunctionArgs): Promise<RecordCollectionLoaderResponse> {
  const incomingUrlParams = new URL(request.url).searchParams;
  const outgoingUrlParams = new URLSearchParams();

  // Copy relevant query parameters from incoming URL to outgoing URL.
  for (const key of FILTER_KEYS) {
    const value = incomingUrlParams.get(key);
    if (value) {
      outgoingUrlParams.set(key, value);
    }
  }

  // Copy all "genres[]" parameters from incoming URL to outgoing URL.

  // Fetch genres separately and include them in the response.
  const [recordCollection, genres] = await Promise.all([
    getJson<RecordCollectionResponse>(
      `${API_URL}/records?${outgoingUrlParams.toString()}`,
    ),
    getJson<Genre[]>(`${API_URL}/genres`),
  ]);

  return {
    ...recordCollection,
    genres,
  };
}
