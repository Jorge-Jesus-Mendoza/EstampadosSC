// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getLink = async (id: string) => {
  const link = await prisma.link.findFirst({ where: { id } });

  return link;
};

export async function GET(request: Request, { params }: Segments) {
  const link = await getLink(params.id);

  if (!link) {
    return NextResponse.json(
      { message: `Link con id ${params.id} no exite` },
      { status: 404 }
    );
  }

  return NextResponse.json(link);
}

const putSchema = yup.object({
  name: yup.string(),
  url: yup.string(),
});

export async function PUT(request: Request, { params }: Segments) {
  const link = await getLink(params.id);

  if (!link) {
    return NextResponse.json(
      { message: `Link con id ${params.id} no exite` },
      { status: 404 }
    );
  }

  try {
    const { name, url } = await putSchema.validate(await request.json());

    const updatedLink = await prisma.link.update({
      where: { id: params.id },
      data: { name, url },
    });

    return NextResponse.json(updatedLink);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: Segments) {
  const response = await prisma.link.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(response);
}
