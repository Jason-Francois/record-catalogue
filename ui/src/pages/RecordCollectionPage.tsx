import SearchBar from "../components/SearchBar";
import RecordGrid from "../components/RecordGrid";
import PaginationControl from "../components/PaginationControl";
import type { RecordCollectionLoaderResponse } from "../api/recordCollectionLoader";
import { useLoaderData } from "react-router";

export default function RecordCollectionPage() {
  const loaderData = useLoaderData() as RecordCollectionLoaderResponse;
  return (
    <div className="my-8">
      <SearchBar genres={loaderData.genres} />
      <RecordGrid records={loaderData.records} />
      <PaginationControl pagination={loaderData.pagination} />
    </div>
  );
}
