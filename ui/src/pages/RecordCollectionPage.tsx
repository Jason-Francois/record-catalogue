import SearchBar from "../components/SearchBar";
import RecordGrid from "../components/RecordGrid";
import PaginationControl from "../components/PaginationControl";
import ViewToggle from "../components/ViewToggle";
import type { RecordCollectionLoaderResponse } from "../api/recordCollectionLoader";
import { useLoaderData, useSearchParams } from "react-router";
import Carousel from "../components/Carousel";

export default function RecordCollectionPage() {
  const loaderData = useLoaderData() as RecordCollectionLoaderResponse;
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") === "carousel" ? "carousel" : "grid";
  const handleViewChange = (view: "grid" | "carousel") => {
    if (view === "grid") {
      setSearchParams({ view: "grid" });
    } else {
      setSearchParams({ view: "carousel" });
    }
  };
  return (
    <div className="flex-1 flex flex-col my-8">
      <SearchBar genres={loaderData.genres} />
      <ViewToggle view={view} onViewChange={handleViewChange} />
      {view === "carousel" && <Carousel items={loaderData.records} />}
      {view === "grid" && (
        <>
          <RecordGrid records={loaderData.records} />
          <PaginationControl pagination={loaderData.pagination} />
        </>
      )}
    </div>
  );
}
