import ButtonLink from "../components/ButtonLink";

export default function HomePage() {
  return (
    // Move center this to the middle of the div
    <div className="flex-1 flex flex-col items-center justify-center">
      <h1 className="font-display text-5xl font-bold tracking-tight mb-4">
        Welcome to Hathor!
      </h1>
      <p className="text-lg text-muted">
        Explore and manage your record collection with ease.
      </p>
      <div className="mt-4 flex gap-3">
        <ButtonLink variant="primary" to="/records/new">
          Add New Record
        </ButtonLink>

        <ButtonLink variant="secondary" to="/records">
          View Collection
        </ButtonLink>
      </div>
    </div>
  );
}
