import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.link.deleteMany();
  await prisma.user.deleteMany();
  await prisma.pdfFile.deleteMany();

  await prisma.catalog_Url.deleteMany();

  await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["user", "admin", "super-user"],
    },
  });

  await prisma.link.createMany({
    data: [
      {
        name: "Instagram",
        url: "https://www.instagram.com/estampados.sc/",
      },
      {
        name: "Whatsapp",
        url: "https://alvo.chat/2Go?fbclid=PAZXh0bgNhZW0CMTEAAaaho5fIRTbKC8l6udLXjw6W0GVhlkWoSuFyt1WsXxE6e2UVzuWNXm7z5rk_aem_Cr0LGxREM7gAc9iO6_rsIg",
      },
    ],
  });

  await prisma.catalog_Url.create({
    data: {
      url: "https://drive.google.com/file/d/13HDngqDRGFwjCUfGUCrkmXdgb4P0IMyt/view?usp=drive_link",
    },
  });

  return NextResponse.json({ message: "Seed Executed" });
}
