import type RecordItem from "../types/record";
import { API_URL } from "../config";
import { patchJson } from "./client";
import type { NewRecord } from "../types/record";

export default function updateRecord(id: number, data: NewRecord) {
  return patchJson<RecordItem>(`${API_URL}/records/${id}`, {
    record: data,
  });
}
