import { revalidatePath } from "next/cache";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  router: AppRouterInstance;
}

export const handleSubmitFile = async ({
  setLoading,
  setSuccess,
  setFile,
  setError,
  file,
  router,
}: Props) => {
  setLoading(true);
  const formData = new FormData();
  formData.append("file", file!);

  const response = await fetch("/api/file", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    console.log("File uploaded successfully");
    setSuccess("Archivo subido con éxito.");
    setFile(null); // Reset file input
    setLoading(false);
  } else {
    console.log("File upload failed");
    setError("Error al subir el archivo. Por favor, inténtalo de nuevo.");
    setLoading(false);
  }

  router.refresh();
};
