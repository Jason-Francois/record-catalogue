import ButtonLink from "../components/ButtonLink";

export default function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col gap-6 items-center justify-center">
      <h1 className="font-display text-5xl font-bold tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-lg text-muted">
        The page you are looking for does not exist.
      </p>
      <ButtonLink variant="primary" size="medium" to="/">
        Go back to the homepage
      </ButtonLink>
    </div>
  );
}
