import useToast from "../hooks/useToast";
import createRecord from "../api/createRecord";
import RecordForm, { type RecordFormValues } from "../components/RecordForm";

export default function NewRecordPage() {
  const { showToast } = useToast();

  async function handleSubmit(values: RecordFormValues) {
    try {
      await createRecord(values);
      showToast("Record successfully added!", "success");
    } catch {
      showToast("Failed to add record. Please try again.", "error");
    }
  }
  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="font-display text-5xl font-bold tracking-tight mb-4">
          Add New Record
        </h1>
        <p className="text-lg text-muted">
          Fill out the form below to add a new record to your collection.
        </p>
        <RecordForm onSubmit={handleSubmit} submitLabel="Add Record" />
      </div>
    </>
  );
}
