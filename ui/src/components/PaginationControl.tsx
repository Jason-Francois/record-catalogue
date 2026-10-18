import { useSearchParams } from "react-router";
import type { Pagination } from "../api/recordCollectionLoader";
interface PaginationControlProps {
  pagination: Pagination;
}
export default function PaginationControl({
  pagination,
}: PaginationControlProps) {
  const [, setSearchParams] = useSearchParams();
  const pageNumbers = Array.from(
    { length: pagination.total_pages },
    (_, i) => i + 1,
  );
  const changePage = (pageNumber: number) => {
    setSearchParams(
      (params: URLSearchParams) => {
        if (pageNumber) {
          params.set("page", pageNumber.toString());
        }
        return params;
      },
      { preventScrollReset: true },
    );
  };
  return (
    <>
      <nav
        aria-label="Pagination"
        className="my-6 flex flex-wrap justify-center gap-1.5"
      >
        <button
          aria-label="Previous page"
          className="min-w-10 h-10 px-3 rounded-md border border-line bg-surface text-fg cursor-pointer transition-colors hover:bg-line focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface"
          disabled={pagination.current_page === 1}
          onClick={() => changePage(Math.max(pagination.current_page - 1, 1))}
        >
          &lsaquo;
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            aria-current={
              pageNumber === pagination.current_page ? "page" : undefined
            }
            className={`min-w-10 h-10 px-3 rounded-md border border-line bg-surface text-fg cursor-pointer transition-colors hover:bg-line focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface ${pageNumber === pagination.current_page ? "!bg-primary !border-primary !text-on-primary font-bold" : ""}`}
            key={pageNumber}
            onClick={() => {
              changePage(pageNumber);
            }}
          >
            {pageNumber}
          </button>
        ))}
        <button
          aria-label="Next page"
          className="min-w-10 h-10 px-3 rounded-md border border-line bg-surface text-fg cursor-pointer transition-colors hover:bg-line focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface"
          disabled={pagination.current_page === pagination.total_pages}
          onClick={() =>
            changePage(
              Math.min(pagination.current_page + 1, pagination.total_pages),
            )
          }
        >
          &rsaquo;
        </button>
      </nav>
    </>
  );
}
