import { isRouteErrorResponse, useRouteError } from "react-router";
export default function ErrorBoundary() {
  const error: unknown = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Something went wrong</h1>
        <p>We couldn't load this page. Please try again.</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Unknown Error</h1>
        <p>We couldn't load this page. Please try again.</p>
      </div>
    );
  }
}
