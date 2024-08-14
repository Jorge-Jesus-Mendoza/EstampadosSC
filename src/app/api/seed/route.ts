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
        name: "Twitter",
        url: "https://x.com/home",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
    ],
  });

  await prisma.catalog_Url.create({
    data: {
      url: "https://drive.google.com/file/d/1V9zjwhiB_tD_gAAGro4s8q8_wf_PuAb4/view?usp=drive_link",
    },
  });

  return NextResponse.json({ message: "Seed Executed" });
}
