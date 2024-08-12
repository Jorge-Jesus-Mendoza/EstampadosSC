import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    await prisma.pdfFile.deleteMany();
    const formData = await req.formData();
    const file = formData.get("file");
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const mimeType = file.type;

    // Guarda el archivo en la base de datos
    const savedFile = await prisma.pdfFile.create({
      data: {
        name: fileName,
        mimeType: mimeType,
        data: buffer,
      },
    });

    return NextResponse.json(savedFile);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};
