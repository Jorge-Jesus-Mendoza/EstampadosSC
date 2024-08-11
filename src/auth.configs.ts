import { PrismaAdapter } from "@auth/prisma-adapter";
import nextAuth, { NextAuthOptions } from "next-auth";
import prisma from "./lib/prisma";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "./auth/components/actions/auth-actions";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "tucorreo@email.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "******",
        },
        access_type: {
          label: "Type of Access",
          type: "text",
          placeholder: "signIn or logIn",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const user = await signInEmailPassword(
          credentials.email,
          credentials.password,
          credentials.access_type
        );

        if (!user) {
          throw new Error("Usuario o contraseña incorrectos");
        }

        if (user && !user.isActive) {
          throw new Error(
            "Su usuario se encuentra desactivado, contacte con un administrador"
          );
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      if (user && "error" in user) {
        throw new Error(user.error);
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email ?? undefined },
        });

        if (!dbUser?.isActive) {
          throw new Error("El usuario no está activo");
        }

        token.roles = dbUser?.roles ?? ["no-roles"];
        token.id = dbUser?.id ?? "no-uuid";
      }

      return token;
    },

    async session({ session, token }) {
      console.log("pass");
      if (session?.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/auth/logIn",
    newUser: "/admin/auth/singIn",
  },
};
