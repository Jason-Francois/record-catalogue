import { API_URL } from "../config";
import { deleteRequest } from "./client";

export default function deleteRecord(id: number) {
  return deleteRequest(`${API_URL}/records/${id}`);
}
