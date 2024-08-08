"use server";

import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

interface Props {
  email: string;
  password: string;
  previousPassword: string;
}

interface Roles {
  roles: string[];
  id: string;
  isActive: boolean;
}

export const updatePassword = async ({
  email,
  password,
  previousPassword,
}: Props) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!bcrypt.compareSync(previousPassword, user?.password ?? "")) {
    return null;
  }

  const updatedTodo = await prisma.user.update({
    where: { email },
    data: { password: bcrypt.hashSync(password) },
  });

  return updatedTodo;
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin");
  } catch (error) {
    throw `error eliminando Usuario con id ${id}`;
  }
};

export const updateUser = async ({
  id,
  roles,
  isActive = true,
}: Roles): Promise<User | void> => {
  const user = prisma.user.findFirst({ where: { id } });

  if (!user) {
    throw `Usuario con el id ${id} no encontrado`;
  }

  const updatedUser = prisma.user.update({
    where: { id },
    data: { roles, isActive },
  });

  revalidatePath("/admin");

  return updatedUser;
};
