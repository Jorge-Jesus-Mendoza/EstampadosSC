import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/components/actions/auth-actions";
import { authOptions } from "@/auth.configs";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
