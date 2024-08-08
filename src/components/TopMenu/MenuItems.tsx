"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { IoPerson } from "react-icons/io5";

interface Props {
  email: string;
  roles: string[];
}

const MenuItems = ({ email, roles }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropSession = () => {
    toggleDropdown();
    signOut({ callbackUrl: "/admin/auth/logIn", redirect: true });
  };

  const isAdmin = Boolean(
    roles.find((userRole) => userRole === "admin" || userRole === "super-user")
  );

  const isSuper = Boolean(roles.find((userRole) => userRole === "super-user"));

  return (
    <div
      ref={dropdownRef}
      className="z-20 flex flex-col justify-end items-end space-x-2"
    >
      <button
        id={`dropdownDefaultButton`}
        onClick={toggleDropdown}
        className="user-button mb-2 flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
      >
        <IoPerson size={25} />
      </button>
      <div
        id={`dropdown`}
        className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        {isOpen && (
          <>
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div className="font-medium truncate">{email}</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby={`dropdownDefaultButton`}
            >
              <li onClick={toggleDropdown}>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li onClick={toggleDropdown}>
                <Link
                  href="/admin/list"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Lista de Enlaces
                </Link>
              </li>
              <li onClick={toggleDropdown}>
                <Link
                  href="/admin/settings"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Ajustes
                </Link>
              </li>

              {isAdmin && (
                <li onClick={toggleDropdown}>
                  <Link
                    href="/admin/catalog"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Catálogo
                  </Link>
                </li>
              )}

              {isSuper && (
                <li onClick={toggleDropdown}>
                  <Link
                    href="/admin/users"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Usuarios
                  </Link>
                </li>
              )}

              <li onClick={dropSession}>
                <Link
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Cerrar Sesión
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuItems;
