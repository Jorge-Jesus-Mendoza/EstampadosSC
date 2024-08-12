import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.link.deleteMany();
  await prisma.user.deleteMany();
  await prisma.pdfFile.deleteMany();

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

  return NextResponse.json({ message: "Seed Executed" });
}
