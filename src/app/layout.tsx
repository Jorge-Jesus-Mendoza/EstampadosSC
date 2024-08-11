import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/auth/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Estampados SC",
  description: "Especialistas en dar vida a tus ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="es">
        <head>
          <link rel="icon" href="/images/favicon.ico" />

          <body className={`${inter.className} user-dashboard`}>
            {children}
          </body>
        </head>
      </html>
    </AuthProvider>
  );
}
