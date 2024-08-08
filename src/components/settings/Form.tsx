"use client";

import React, { FormEvent, useState } from "react";
import { updatePassword } from "@/actions/user_actions/actions";

interface Props {
  email: string;
}

const Form = ({ email }: Props) => {
  const [password, setPassword] = useState("");
  const [passwordChecker, setPasswordChecker] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");

  const [submitErrors, setSubmitErrors] = useState({
    color: "",
    message: "",
    open: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = await updatePassword({ email, password, previousPassword });

    if (!user) {
      setSubmitErrors((prevState) => ({
        ...prevState,
        color: "red",
        message: "La contraseña no coincide con nuestros registros",
        open: true,
      }));
    } else {
      setSubmitErrors((prevState) => ({
        ...prevState,
        color: "green",
        message: "Contraseña actualizada con éxito",
        open: true,
      }));
    }
  };

  return (
    <form className="flex flex-col standar-form" onSubmit={handleSubmit}>
      <span className="text-center my-10 text-2xl">Datos del usuario</span>
      <div className="my-2">
        <input
          type="text"
          placeholder="Correo"
          disabled
          value={email}
          className="py-3 px-4 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="my-2">
        <input
          type="password"
          autoComplete="off"
          placeholder="Contraseña Anterior"
          name="previousPassword"
          onChange={(e) => setPreviousPassword(e.target.value)}
          value={previousPassword}
          className="py-3 px-4 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="my-2">
        <input
          type="password"
          autoComplete="off"
          placeholder="Nueva Contraseña"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="py-3 px-4 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="my-2">
        <input
          type="password"
          autoComplete="off"
          placeholder="Repetir Contraseña"
          name="passwordChecker"
          onChange={(e) => setPasswordChecker(e.target.value)}
          value={passwordChecker}
          className="py-3 px-4 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        onClick={() => ({})}
        disabled={
          !password ||
          !passwordChecker ||
          !previousPassword ||
          passwordChecker !== password
        }
        className={`my-2 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
          password &&
          passwordChecker &&
          previousPassword &&
          passwordChecker === password
            ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            : "bg-gray-400"
        }`}
      >
        Actualizar Contraseña
      </button>

      {submitErrors.open && (
        <p style={{ color: submitErrors.color }}>{submitErrors.message}</p>
      )}
    </form>
  );
};

export default Form;
