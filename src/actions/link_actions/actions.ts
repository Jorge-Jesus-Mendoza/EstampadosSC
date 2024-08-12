"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface LinkProps {
  name: string;
  url: string;
  id?: string;
}

export const addLink = async ({ name, url }: LinkProps) => {
  try {
    const todo = await prisma.link.create({ data: { name, url } });
    revalidatePath("/admin");
    return todo;
  } catch (error) {
    throw new Error("Error creando enlace");
  }
};

export const updateLink = async ({ id, name, url }: LinkProps) => {
  if (!id) throw new Error("ID es requerido para actualizar el enlace");

  const todo = await prisma.link.findFirst({ where: { id } });

  if (!todo) {
    throw new Error(`Enlace con el id ${id} no encontrado`);
  }

  const updatedTodo = await prisma.link.update({
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
    throw new Error(`Error eliminando enlace con id ${id}`);
  }
};

// export async function uploadPdf(formData: FormData) {
//   try {
//     const file = formData.get("file") as File | null;

//     if (!file) {
//       throw new Error("No se ha subido ningún archivo");
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadDir = join(process.cwd(), "public", "uploads");
//     const filename = `${Date.now()}-${file.name}`;
//     const filepath = join(uploadDir, filename);

//     await writeFile(filepath, buffer);

//     const savedFile = await prisma.pdfFile.create({
//       data: {
//         filename: file.name,
//         path: `/uploads/${filename}`,
//       },
//     });

//     return savedFile;
//   } catch (error: unknown) {
//     console.error("Detailed error in uploadPdf:", error);
//     if (error instanceof Error) {
//       throw new Error(`Failed to upload PDF: ${error.message}`);
//     }
//     throw new Error("Failed to upload PDF due to an unknown error");
//   }
// }

export const deletePdf = async (): Promise<void> => {
  try {
    await prisma.pdfFile.deleteMany();
    revalidatePath("/admin");
  } catch (error) {
    throw new Error("Error eliminando PDF's");
  }
};

export const getFiles = async () => {
  try {
    const files = await prisma.pdfFile.findMany();
    return files;
  } catch (error) {
    throw new Error("Error recuperando PDFs");
  }
};
