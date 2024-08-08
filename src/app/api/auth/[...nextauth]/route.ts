import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/components/actions/auth-actions";

export const authOptions = {
  // Configure one or more authentication providers
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
          label: "type of access",
          type: "text",
          placeholder: "signIn or logIn",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const user = await signInEmailPassword(
          credentials!.email,
          credentials!.password,
          credentials!.access_type
        );

        if (!user) {
          return { error: "Usuario o contraseña incorrectos" };
        } else if (user && !user.isActive) {
          return {
            error:
              "Su usuario se encuentra desactivado, contacte con un administrador",
          };
        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      if (user?.error) {
        throw new Error(user?.error);
      }
      return true;
    },

    async jwt({ token, user, account, profile }: any) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email ?? "no-email",
        },
      });

      if (!dbUser?.isActive) {
        throw Error("El usuario no está activo");
      }
      token.roles = dbUser?.roles ?? ["no-roles"];
      token.id = dbUser?.id ?? "no-uuid";

      return token;
    },

    async session({ session, token, user }: any) {
      if (session && session?.user) {
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
