import Form from "@/components/catalog/Form";
import prisma from "@/lib/prisma";

export default async function NamePage(): Promise<JSX.Element> {
  const pdf = await prisma.pdfFile.findFirst();

  return (
    <div className="flex flex-col items-center justify-center">
      <Form pdfId={pdf?.id} pdfName={pdf?.name} />
    </div>
  );
}
