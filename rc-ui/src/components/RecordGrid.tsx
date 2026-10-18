import type RecordItem from "../types/record";
import RecordCard from "./RecordCard";

interface RecordGridProps {
  records: RecordItem[];
}
export default function RecordGrid({ records }: RecordGridProps) {
  if (records.length === 0) {
    return (
      <>
        <p>No records found.</p>
      </>
    );
  }

  const recordCards = records.map((record: RecordItem) => {
    return <RecordCard key={record.id} record={record} />;
  });
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recordCards}
    </ul>
  );
}
