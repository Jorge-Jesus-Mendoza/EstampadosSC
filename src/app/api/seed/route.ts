import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.link.deleteMany();

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
