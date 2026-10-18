import type RecordItem from "../types/record";
import { getJson } from "./client";
import { API_URL } from "../config";
import type { LoaderFunctionArgs } from "react-router";
const FILTER_KEYS = ["query", "genre", "year_from", "year_to", "page"];

export interface RecordCollectionLoaderResponse {
  records: RecordItem[];
  pagination: Pagination;
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

  return getJson<RecordCollectionLoaderResponse>(
    `${API_URL}/records?${outgoingUrlParams.toString()}`,
  );
}
