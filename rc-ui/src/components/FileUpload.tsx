import { bulkCreateRecord } from "../api/createRecord";
import useToast from "../hooks/useToast";
import { Upload } from "lucide-react";
import buttonStyles from "../styles/buttonStyles";
import { useNavigate } from "react-router";
export default function FileUpload() {
  const navigate = useNavigate();
  const ACCEPTABLE_FILE_TYPES = ["csv"];
  const toast = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      !ACCEPTABLE_FILE_TYPES.includes(
        file.name.toLowerCase().split(".").pop() || "",
      )
    ) {
      toast.showToast("Invalid file format", "error");
      return;
    }

    // You can add the logic to upload the file to the server here
    bulkCreateRecord(file)
      .then(() => {
        toast.showToast("File uploaded successfully", "success");
        navigate("/records");
      })
      .catch(() => toast.showToast("Upload failed", "error"))
      .finally(() => {
        // lets the user pick the same file again
        if (event.target) event.target.value = "";
      });
  };

  return (
    <label
      className={`${buttonStyles.base} ${buttonStyles.variants.secondary} ${buttonStyles.sizes.large} flex w-full items-center justify-center gap-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary`}
    >
      <Upload className="size-5" />
      Upload CSV
      <input
        className="sr-only"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
    </label>
  );
}
