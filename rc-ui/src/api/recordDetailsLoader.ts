import type RecordItem from "../types/record";
import type { LoaderFunctionArgs } from "react-router";
import { getJson } from "./client";
import { API_URL } from "../config";

export default function recordDetailsLoader({
  params,
}: LoaderFunctionArgs): Promise<RecordItem> {
  return getJson<RecordItem>(`${API_URL}/records/${params.id}`);
}
