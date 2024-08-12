"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  user:
    | {
        name?: string | null;
        email?: string | null;
        image?: string | null;
      }
    | undefined;
}

const TopLogo = ({ user }: Props) => {
  const actualPath = usePathname();
  useEffect(() => {
    if (!user && !actualPath.includes("auth")) redirect("/admin/auth/logIn");

    return () => {};
  }, [user, actualPath]);

  return (
    <Link href={"/dashboard"}>
      <h5 className="text-gray-600 font-medium top-logo">Estampados SC</h5>
    </Link>
  );
};

export default TopLogo;
