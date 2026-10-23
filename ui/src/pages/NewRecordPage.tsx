import useToast from "../hooks/useToast";
import createRecord from "../api/createRecord";
import RecordForm, { type RecordFormValues } from "../components/RecordForm";
import { useLoaderData } from "react-router";
import type Genre from "../types/genre";

export default function NewRecordPage() {
  const genres = useLoaderData() as Genre[];
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
      <div className="flex-1 flex flex-col items-center justify-center my-8">
        <h1 className="font-display text-5xl font-bold tracking-tight mb-4">
          Add Records
        </h1>
        <p className="text-lg text-muted">
          Fill out the form below to add a new record to your collection.
        </p>
        <RecordForm
          onSubmit={handleSubmit}
          submitLabel="Add Record"
          genres={genres}
        />
      </div>
    </>
  );
}
