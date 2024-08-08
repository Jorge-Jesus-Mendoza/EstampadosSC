"use client";

import React, { FormEvent, useState } from "react";

type StandarUser = {
  id: string;
  name: string | null;
  roles: string[];
  isActive: boolean;
  email: string | null;
};

interface Props {
  user: StandarUser;

  ServerAction: any;
  onClose?: any;
}

export const Drawer = ({ user, ServerAction, onClose }: Props) => {
  const [formValues, setFormValues] = useState<string[]>(user.roles);

  const [status, setStatus] = useState<boolean>(user.isActive);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formValues.length === 0) {
      return;
    }

    ServerAction({
      roles: formValues,
      id: user.id,
      isActive: status,
    });
    setFormValues([]);
    setStatus(true);
    onClose();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked) {
      setFormValues((prev) => [...prev, name]);
    } else {
      setFormValues((prev) => prev.filter((item) => item !== name));
    }
  };

  const OpenModal = user?.id!!;

  return (
    <div>
      {/* Main modal */}
      {OpenModal && (
        <div
          id="static-modal"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Editar permisos
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onClose}
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

              <div className="p-4 space-y-4">
                <fieldset className="flex px-10">
                  <div className="flex items-center mb-4 mx-4">
                    <input
                      id="user"
                      type="checkbox"
                      checked={Boolean(
                        formValues.find((rol) => rol === "user")
                      )}
                      name="user"
                      onChange={handleCheckboxChange}
                      disabled
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      User
                    </label>
                  </div>

                  <div className="flex items-center mb-4 mx-4">
                    <input
                      id="admin"
                      type="checkbox"
                      name="admin"
                      checked={Boolean(
                        formValues.find((rol) => rol === "admin")
                      )}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Admin
                    </label>
                  </div>

                  <div className="flex items-center mb-4 mx-4">
                    <input
                      id="super-user"
                      type="checkbox"
                      name="super-user"
                      checked={Boolean(
                        formValues.find((rol) => rol === "super-user")
                      )}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Super-User
                    </label>
                  </div>
                </fieldset>
                <label className="px-10 inline-flex items-center mb-5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={status}
                    onChange={() => setStatus(!status)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Status
                  </span>
                </label>
              </div>
              <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={onSubmit}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Aceptar
                </button>
                <button
                  onClick={onClose}
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
