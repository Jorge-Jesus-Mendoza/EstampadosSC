"use server";

import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { join } from "path";

interface Props {
  name: string;
  url: string;
  id?: string;
}

export const addLink = async ({ name, url }: Props) => {
  try {
    const todo = await prisma.link.create({ data: { name, url } });
    revalidatePath("/admin");
    return todo;
  } catch (error) {
    throw "error creando Enlace";
  }
};

export const updateLink = async ({ id, name, url }: Props) => {
  const todo = prisma.link.findFirst({ where: { id } });

  if (!todo) {
    throw `Enlace con el id ${id} no encontrado`;
  }

  const updatedTodo = prisma.link.update({
    where: { id },
    data: { name, url },
  });

  revalidatePath("/admin");

  return updatedTodo;
};

export const deleteLink = async (id: string): Promise<void> => {
  try {
    await prisma.link.delete({ where: { id } });
    revalidatePath("/admin");
  } catch (error) {
    throw `error eliminando Enlace con id ${id}`;
  }
};

//test actions
export async function uploadPdf(formData: any) {
  try {
    const file = formData.get("file");

    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Asegúrate de que esta ruta existe y tiene permisos de escritura
    const uploadDir = join(process.cwd(), "public", "uploads");

    const filename = `${Date.now()}-${file.name}`;
    const filepath = join(uploadDir, filename);

    await writeFile(filepath, buffer);

    // Guardar la información en la base de datos
    const savedFile = await prisma.pdfFile.create({
      data: {
        filename: file.name,
        path: `/uploads/${filename}`,
      },
    });

    return savedFile;
  } catch (error) {
    console.error("Detailed error in uploadPdf:", error);
    if (error) {
    }
    throw new Error(`Failed to upload PDF: ${error?.message}`);
  }
}

export const deletePdf = async () => {
  try {
    await prisma.pdfFile.deleteMany();
    revalidatePath("/admin");
  } catch (error) {
    throw `error eliminando PDF'S`;
  }
};

export const getFiles = async () => {
  try {
    const files = await prisma.pdfFile.findMany();
    return files;
  } catch (error) {
    throw `error recuperando pdfs`;
  }
};
