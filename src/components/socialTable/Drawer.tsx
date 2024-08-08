"use client";

import React, { FormEvent, useState } from "react";
import { IoAddCircle } from "react-icons/io5";

interface Props {
  name?: string;
  url?: string;
  isCreate?: boolean;
  id?: string | null;

  isAdmin: boolean;

  ServerAction: any;
  onClose?: any;
}

export const Drawer = ({
  name = "",
  url = "",
  isCreate = false,
  id = null,
  ServerAction,
  onClose,
  isAdmin,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: name,
    url: url,
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setFormValues({
      name: "",
      url: "",
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      formValues.name.trim().length === 0 ||
      formValues.url.trim().length === 0
    ) {
      return;
    }

    ServerAction({
      name: formValues.name,
      url: formValues.url,
      id,
    });

    if (isCreate) {
      toggleModal();
    } else {
      onClose();
    }
  };

  const OpenModal = isCreate ? isOpen : id!!;

  return (
    <div>
      {isCreate && isAdmin && (
        <div className="flex justify-end p-5">
          <button
            onClick={toggleModal}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            <div className="flex justify-center items-center">
              <IoAddCircle size={30} />
              Agregar Enlace
            </div>
          </button>
        </div>
      )}

      {/* Main modal */}
      {OpenModal && (
        <div
          id="static-modal"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Agregar Enlace
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={isCreate ? toggleModal : onClose}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 space-y-4">
                <form className="space-y-4" onSubmit={onSubmit}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formValues.name}
                      onChange={(e) =>
                        setFormValues((prevFormValues) => ({
                          ...prevFormValues,
                          name: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Link
                    </label>
                    <input
                      type="url"
                      name="url"
                      id="url"
                      value={formValues.url}
                      onChange={(e) =>
                        setFormValues((prevFormValues) => ({
                          ...prevFormValues,
                          url: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                </form>
              </div>
              {/* Modal footer */}
              <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={onSubmit}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Aceptar
                </button>
                <button
                  onClick={isCreate ? toggleModal : onClose}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
