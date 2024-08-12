import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import prisma from "./lib/prisma";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "./auth/components/actions/auth-actions";

interface UserWithError {
  error: string;
  // otras propiedades de User...
}

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
      const userWithError = user as unknown as UserWithError;

      if (userWithError.error) {
        throw new Error(userWithError.error);
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

        // Manipulación del token usando el tipo genérico `JWT`
        token.roles = dbUser?.roles ? (dbUser.roles as string[]) : ["no-roles"];
        token.id = dbUser?.id ?? "no-uuid";
      }

      return token; // Asegúrate de retornar el token, que es de tipo `JWT`
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.roles = token.roles as string[]; // Asegúrate de que sea un string[]
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/auth/logIn",
    newUser: "/admin/auth/singIn",
  },
};
