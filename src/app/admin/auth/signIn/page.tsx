"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignInPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const [passwordCheck, setPasswordCheck] = useState("");

  const disableButton =
    formValues.email === "" ||
    formValues.password === "" ||
    passwordCheck === "" ||
    passwordCheck !== formValues.password;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (disableButton) return null;
    const user = await signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      access_type: "signIn",
      redirect: false,
    });

    if (user?.error) {
      setShowError(true);
    } else {
      router.push("/admin/list");
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center p-5">
      <div className="bg-white rounded-md p-5 auth-form">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={onSubmit}
        >
          <div className="flex justify-center mb-10">
            <Image
              src="/images/H_LOGO.png"
              width={0}
              height={0}
              className="auth-logo"
              alt=""
              sizes="100vw"
              priority
            />
          </div>
          <div className="w-3/4 my-2">
            <input
              type="text"
              placeholder="Correo"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues((prevFormValues) => ({
                  ...prevFormValues,
                  email: e.target.value,
                }))
              }
              className="py-3 px-4 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="w-3/4 my-2">
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              autoComplete="off"
              value={formValues.password}
              onChange={(e) =>
                setFormValues((prevFormValues) => ({
                  ...prevFormValues,
                  password: e.target.value,
                }))
              }
              className="py-3 px-4 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="w-3/4 my-2">
            <input
              type="password"
              autoComplete="off"
              placeholder="Repita la contraseña"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className="py-3 px-4 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {showError && (
            <p style={{ color: "red" }}>
              Ya existe un usuario creado con ese correo
            </p>
          )}
          <button
            type="submit"
            disabled={disableButton}
            onClick={onSubmit}
            className={`my-2 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              !disableButton
                ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                : "bg-gray-400"
            } `}
          >
            Registrarse
          </button>
          <p className="text-center">
            Ya tienes una cuenta?{" "}
            <Link className="text-cyan-500" href="/admin/auth/logIn">
              Inicia Sesión
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
