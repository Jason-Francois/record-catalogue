import { createBrowserRouter } from "react-router";
import recordCollectionLoader from "./api/recordCollectionLoader";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import RecordCollectionPage from "./pages/RecordCollectionPage";
import NewRecordPage from "./pages/NewRecordPage";
import RecordDetailsPage from "./pages/RecordDetailsPage";
import ErrorBoundary from "./pages/RouteErrorBoundary";
import NotFoundPage from "./pages/NotFoundPage";
import recordDetailsLoader from "./api/recordDetailsLoader";

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    ErrorBoundary,
    children: [
      { index: true, Component: HomePage },
      {
        path: "records",
        loader: recordCollectionLoader,
        Component: RecordCollectionPage,
      },
      { path: "records/new", Component: NewRecordPage },
      {
        path: "records/:id",
        loader: recordDetailsLoader,
        Component: RecordDetailsPage,
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
