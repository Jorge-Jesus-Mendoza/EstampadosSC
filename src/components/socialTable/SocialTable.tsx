"use client";

import { Link } from "@prisma/client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import moment from "moment";
import { deleteLink, updateLink } from "@/actions/link_actions/actions";
import { IoPencil, IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";
import { Drawer } from "./Drawer";
import ReactPaginate from "react-paginate";

interface Props {
  links: Link[];
  isAdmin: boolean;
  columnsToHide: string[];
}

interface RowData {
  name: string;
  url: string;
  createdAt: Date;
  updatedAt?: Date;
  id: string;
}

type StandarLink = {
  id: string;
  name: string;
  url: string;
};

// Define el tipo de las columnas
type Column = ColumnDef<RowData, unknown>;

export const SocialTable = ({
  links,
  isAdmin,
  columnsToHide,
}: Props): React.ReactNode => {
  const [openDrawer, setOpenDrawer] = useState<StandarLink | null>(null);

  const handleDrawerOpen = (link: StandarLink) => {
    setOpenDrawer(link);
  };

  const handleAlert = (id: string) => {
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
        deleteLink(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Se ha eliminado el registro.",
          icon: "success",
        });
      }
    });
  };

  function truncateText(text: string, maxLength: number) {
    if (text && text.length > maxLength) {
      return `${text.substring(0, maxLength - 3)}...`;
    }
    return text;
  }

  const columns = useMemo<Column[]>(
    () => [
      {
        header: "Nombre",
        accessorKey: "name",
      },
      {
        header: "URL",
        accessorKey: "url",
        cell: (info) => truncateText(info.getValue() as string, 35),
      },
      // {
      //   header: "Creado el",
      //   accessorKey: "createdAt",
      //   cell: (info) => moment(info.getValue() as Date).format("DD/MM/YYYY"),
      // },
      // {
      //   header: "Actualizado el",
      //   accessorKey: "updatedAt",
      //   cell: (info) => moment(info.getValue() as Date).format("DD/MM/YYYY"),
      // },
      {
        header: "Acciones",
        accessorKey: "id",
        cell: ({ row }: { row: Row<RowData> }) => {
          const link = row.original;
          return (
            <div className="flex justify-center">
              <button
                onClick={() => handleDrawerOpen(link)}
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <IoPencil />
              </button>
              <button
                type="button"
                onClick={() => handleAlert(link.id)}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                <IoTrash />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const SocialLinks = useMemo(() => Object.values(links), [links]);

  const columnVisibility = useMemo(() => {
    const visibility: Record<string, boolean> = {};
    columns.forEach((column) => {
      if ("accessorKey" in column && column.accessorKey) {
        visibility[column.accessorKey] = !columnsToHide.includes(
          column.accessorKey
        );
      }
    });
    return visibility;
  }, [columns, columnsToHide]);

  const table = useReactTable({
    data: SocialLinks,
    columns: columns,
    state: {
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="social-table">
      <table className="mt-3 ">
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <div className="flex justify-center items-center">
                  <strong>No hay enlaces guardados</strong>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {table.getPageCount() > 1 && (
        <div className="flex p-4">
          <button
            className="mx-2 bg-slate-500 p-2 text-white rounded-xl hover:bg-slate-600"
            onClick={() => table.setPageIndex(0)}
          >
            Primera Página
          </button>
          <button
            className="mx-2 bg-slate-500 p-2 text-white rounded-xl hover:bg-slate-600"
            onClick={() => table.previousPage()}
          >
            Página Anterior
          </button>
          <button
            className="mx-2 bg-slate-500 p-2 text-white rounded-xl hover:bg-slate-600"
            onClick={() => table.nextPage()}
          >
            Página Siguiente
          </button>
          <button
            className="mx-2 bg-slate-500 p-2 text-white rounded-xl hover:bg-slate-600"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Última Página
          </button>
        </div>
      )}

      {openDrawer && (
        <Drawer
          id={openDrawer.id}
          name={openDrawer.name}
          url={openDrawer.url}
          ServerAction={updateLink}
          isCreate={false}
          onClose={() => setOpenDrawer(null)}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};
