import type RecordItem from "../types/record";
import Button from "./Button";
import RecordCard from "./RecordCard";
import "../carousel.css";

interface RecordGridProps {
  records: RecordItem[];
}
export default function RecordGrid({ records }: RecordGridProps) {
  if (records.length === 0) {
    return (
      <div className="flex-1 flex flex-col mx-auto max-w-7xl w-full items-center justify-center">
        <h2 className="text-5xl font-bold text-fg">No records found</h2>
      </div>
    );
  }

  const recordCards = records.map((record: RecordItem) => {
    return <RecordCard key={record.id} record={record} />;
  });
  return (
    <div className="flex-1 flex flex-col mx-auto max-w-7xl w-full gap-8">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recordCards}
      </ul>
    </div>
  );
}
