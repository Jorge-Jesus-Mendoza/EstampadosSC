import { SocialLink } from "@/components";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const SocialLinks = await prisma.link.findMany({ orderBy: { name: "asc" } });
  const pdf = await prisma.pdfFile.findFirst();
  return (
    <div>
      <div className="flex justify-end p-2">
        {pdf && (
          <a
            href={`/api/file/${pdf?.id}`}
            className="p-5 rounded-3xl download-button"
            download={pdf?.name}
          >
            Descarga nuestro catalogo
          </a>
        )}
      </div>

      <div className="flex flex-col text-center items-center  justify-center mt-4 p-0">
        <Link href={"/admin/list"}>
          <div className="flex justify-center">
            <Image
              src="/images/H_LOGO.png"
              width={0}
              height={0}
              className="logo"
              alt=""
              sizes="100vw"
            />
          </div>
        </Link>

        <div className="flex flex-col gap-4 w-full justify-center items-center mt-4 social-column">
          {SocialLinks.map((data) => (
            <SocialLink key={data.name} {...data} />
          ))}
        </div>

        <div className="sara-container w-full flex justify-end m-0">
          <div className=" flex pl-5 justify-end sara-background">
            <Image
              src="/images/V-SARA.png"
              priority
              width={0}
              height={0}
              className="mt-[15%] ml-[10%] sara-image"
              alt=""
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
