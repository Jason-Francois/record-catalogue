import type RecordItem from "../types/record";
import type { LoaderFunctionArgs } from "react-router";
import type Genre from "../types/genre";
import { getJson } from "./client";
import { API_URL } from "../config";

export interface RecordDetailsLoaderData {
  record: RecordItem;
  genres: Genre[];
}
export default function recordDetailsLoader({
  params,
}: LoaderFunctionArgs): Promise<RecordDetailsLoaderData> {
  return Promise.all([
    getJson<RecordItem>(`${API_URL}/records/${params.id}`),
    getJson<Genre[]>(`${API_URL}/genres`),
  ]).then(([record, genres]) => ({ record, genres }));
}
