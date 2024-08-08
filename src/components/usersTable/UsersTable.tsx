"use client";

import { Link, User } from "@prisma/client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";
import { Drawer } from "./Drawer";
import { deleteUser, updateUser } from "@/actions/user_actions/actions";
import SimpleMenu from "./SimpleMenu";

interface Props {
  usersList: User[];

  userLogged:
    | {
        name?: string | null;
        email?: string | null;
        image?: string | null;
      }
    | undefined;
}

interface RowData {
  id: string;
  name: string | null;
  password: string | null;
  roles: string[];
  isActive: boolean;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}

type StandarUser = {
  id: string;
  name: string | null;
  roles: string[];
  isActive: boolean;
  email: string | null;
};

// Define el tipo de las columnas
type Column = ColumnDef<RowData, unknown>;

export const UsersTable = ({
  usersList,
  userLogged,
}: Props): React.ReactNode => {
  const [openDrawer, setOpenDrawer] = useState<StandarUser | null>(null);

  const handleDrawerOpen = (link: StandarUser) => {
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
        deleteUser(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Se ha eliminado el registro.",
          icon: "success",
        });
      }
    });
  };

  const columns = useMemo<Column[]>(
    () => [
      {
        header: "Correo",
        accessorKey: "email",
      },
      {
        header: "Roles",
        accessorKey: "roles",
        cell: ({ row }: { row: Row<RowData> }) => {
          return (
            <span>
              {row.original.roles.map((role: string) => role).join(", ")}
            </span>
          );
        },
      },
      {
        header: "Estado",
        accessorKey: "isActive",
        cell: ({ row }: { row: Row<RowData> }) => {
          return <span>{row.original.isActive ? "Activo" : "Inactivo"}</span>;
        },
      },
      {
        header: "Acciones",
        accessorKey: "id",
        cell: ({ row }: { row: Row<RowData> }) => {
          const user = row.original;
          return (
            <div className="flex justify-center relative">
              <button
                onClick={() => handleDrawerOpen(user)}
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <IoPencil />
              </button>

              {userLogged!.email !== user.email && (
                <button
                  type="button"
                  onClick={() => handleAlert(user.id)}
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  <IoTrash />
                </button>
              )}
              {/* <SimpleMenu user={user} /> */}
            </div>
          );
        },
      },
    ],
    [userLogged]
  );

  const SocialLinks = useMemo(() => Object.values(usersList), [usersList]);

  const table = useReactTable({
    data: SocialLinks,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="social-table overflow-visible">
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
          user={openDrawer}
          ServerAction={updateUser}
          onClose={() => setOpenDrawer(null)}
        />
      )}
    </div>
  );
};
