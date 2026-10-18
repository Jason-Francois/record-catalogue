import RecordForm, { type RecordFormValues } from "../components/RecordForm";
import Button from "../components/Button";
import { Disc3 } from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import deleteRecord from "../api/deleteRecord";
import { Link, useLoaderData, useNavigate, useRevalidator } from "react-router";
import { useState } from "react";
import type RecordItem from "../types/record";
import updateRecord from "../api/updateRecord";
import useToast from "../hooks/useToast";

export default function RecordDetailsPage() {
  const record = useLoaderData() as RecordItem;
  const [isEditing, setIsEditing] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const { showToast } = useToast();

  async function handleDelete() {
    setIsDeleting(true);
    setDeleteError(false);
    try {
      await deleteRecord(record.id);
      navigate("/records");
    } catch {
      setDeleteError(true);
      setIsDeleting(false);
    }
  }

  async function handleSubmit(values: RecordFormValues) {
    try {
      await updateRecord(record.id, values);
      await revalidator.revalidate();
      setIsEditing(false);
      showToast("Record updated!", "success");
    } catch {
      showToast("Failed to update record. Please try again.", "error");
    }
  }

  return (
    <section className="mx-auto w-full max-w-4xl py-10">
      <Link to="/records" className="text-sm text-muted hover:text-fg">
        ← Collection
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-[320px_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-primary/10 text-primary/40 shadow">
          <Disc3 className="absolute inset-0 m-auto size-24" />
          {record.image_url && !imageFailed && (
            <img
              src={record.image_url}
              alt={`${record.title} cover`}
              onError={() => setImageFailed(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>

        {isEditing ? (
          <div>
            <RecordForm
              initialValues={record}
              onSubmit={handleSubmit}
              submitLabel="Save"
            />
            <div className="mt-4">
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <h1 className="font-display text-4xl tracking-tight">
              {record.title}
            </h1>
            <p className="mt-1 text-xl text-muted">{record.artist_name}</p>

            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">
                {record.genre}
              </span>
              <span className="text-muted">{record.release_year}</span>
            </div>

            <div className="mt-8 flex gap-3">
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
              <Button
                variant="danger"
                onClick={() => setIsConfirmingDelete(true)}
              >
                Delete
              </Button>
            </div>
            {deleteError && (
              <p role="alert" className="mt-4 text-danger">
                Couldn't delete this record. Please try again.
              </p>
            )}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={isConfirmingDelete}
        title="Delete this record?"
        message={`"${record.title}" by ${record.artist_name} will be permanently removed.`}
        confirmLabel="Yes, delete"
        isBusy={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmingDelete(false)}
      />
    </section>
  );
}
