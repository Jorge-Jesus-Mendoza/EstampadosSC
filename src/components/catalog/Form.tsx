"use client";

import React, { FormEvent, useState } from "react";
import { handleSubmitFile } from "../settings/helpers/helpers";
import {
  addCatalogUrl,
  deleteCatalogUrl,
  deletePdf,
  updateCatalogUrl,
} from "@/actions/link_actions/actions";
import { IoDownloadOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Props {
  pdfId: number | undefined;
  pdfName: string | undefined;
  catalogId: number | undefined;
  catalogUrl: string;
}

const Form = ({ pdfId, pdfName, catalogId, catalogUrl }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [url, setUrl] = useState<string>(catalogUrl);

  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
    }
  };

  const deleteCurrentPdf = async () => {
    Swal.fire({
      title: "Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCatalogUrl();
        setUrl("");
        Swal.fire({
          title: "Eliminado!",
          text: "Se ha eliminado el enlace del catálogo.",
          icon: "success",
        });
      }
    });
    setFile(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (url.trim().length === 0) {
      return;
    }
    let catalog = null;
    if (!catalogId) {
      catalog = await addCatalogUrl(url);
    } else {
      catalog = await updateCatalogUrl(catalogId, url);
    }

    if (catalog) {
      Swal.fire({
        title: "Actualizado!",
        text: "Se ha actualizado el enlace del catálogo!",
        icon: "success",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Algo ha fallado al actualizar el catálogo!",
      });
    }
  };

  return (
    <form className="flex flex-col standar-form" onSubmit={handleSubmit}>
      <span className="text-center my-4 text-xl">Actualizar Catálogo</span>

      {/* <input
        type="file"
        name="file-input"
        id="file-input"
        onChange={handleFileChange}
        disabled={loading}
        className={`${
          !loading && "cursor-pointer"
        } my-2 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
  file:bg-gray-50 file:border-0
  file:me-4
  file:py-3 file:px-4
  `}
      /> */}

      <div className="my-2">
        <input
          type="text"
          placeholder="Enlace"
          name="url"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          className="py-3 px-4 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        // onClick={() =>
        //   handleSubmitFile({
        //     setError,
        //     setFile,
        //     setLoading,
        //     setSuccess,
        //     file,
        //     router,
        //   })
        // }
        disabled={url.trim().length === 0}
        className={`my-2 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
          !loading && url.trim().length !== 0
            ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            : "bg-gray-400"
        }`}
      >
        {loading ? "Subiendo..." : "Actualizar Catálogo"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {catalogId && (
        <button
          type="button"
          onClick={deleteCurrentPdf}
          className="my-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Eliminar Catálogo
        </button>
      )}

      {/* {pdfId ? (
        <a
          className="my-2 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          href={`/api/file/${pdfId}`}
          download={pdfName}
        >
          <IoDownloadOutline size={30} /> {pdfName}
        </a>
      ) : (
        <button
          disabled
          className="my-2 flex items-center justify-center text-white bg-gray-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          No se ha cargado un catalogo
        </button>
      )} */}
    </form>
  );
};

export default Form;
