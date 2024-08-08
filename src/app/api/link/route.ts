// import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("take") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json(
      { message: "invalid take value" },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      { message: "invalid skip value" },
      { status: 400 }
    );
  }

  const response = await prisma.link.findMany({
    take,
    skip,
  });
  return NextResponse.json(response);
}

const postSchema = yup.object({
  name: yup.string().required(),
  url: yup.string().required(),
});

export async function POST(req: Request) {
  try {
    const { name, url } = await postSchema.validate(await req.json());

    const link = await prisma.link.create({ data: { name, url } });

    return NextResponse.json(link);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
