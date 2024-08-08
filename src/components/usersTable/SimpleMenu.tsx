"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { IoPerson } from "react-icons/io5";

const SimpleMenu = (props: any) => {
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

  console.log("🚀 ~ SimpleMenu ~ props:", props);

  return (
    <div
      ref={dropdownRef}
      className="z-10 flex flex-col justify-center items-end space-x-2 bg-yellow-200"
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
        className="absolute top-full right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        {isOpen && (
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
            {JSON.stringify(props)}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SimpleMenu;
