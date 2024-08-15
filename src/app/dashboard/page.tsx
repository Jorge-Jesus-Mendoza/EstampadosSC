import { SocialLink } from "@/components";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

interface SocialLinkProps {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const SocialLinks = await prisma.link.findMany({ orderBy: { name: "asc" } });
  const pdf = await prisma.pdfFile.findFirst();
  const catalogUrl = await prisma.catalog_Url.findFirst();

  return (
    <div className="super-sara">
      <div className="flex justify-end p-2 top-container">
        {/* {pdf && (
          <a
            href={`/api/file/${pdf?.id}`}
            className="p-5 rounded-3xl download-button"
            download={pdf?.name}
          >
            Descarga nuestro catalogo
          </a>
        )} */}
        {catalogUrl && (
          <Link
            href={catalogUrl.url}
            className="p-5 rounded-3xl download-button"
            target="_blank"
          >
            CATÁLOGO
          </Link>
        )}
      </div>

      <div className="flex flex-col text-center items-center  justify-center p-0">
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
        <div className="flex justify-center">
          <Image
            src="/images/BRAND.png"
            width={0}
            height={0}
            className="brand-logo my-2"
            alt=""
            sizes="100vw"
          />
        </div>

        <div className="flex flex-col gap-4 w-full justify-center items-center mt-2 social-column">
          {SocialLinks.map((data: SocialLinkProps) => (
            <SocialLink key={data.name} {...data} />
          ))}
        </div>

        <div className="sara-container z-10 w-full flex justify-end m-0">
          {/* <div className=" flex pl-5 justify-end sara-background-sm">
            <Image
              src="/images/V-SARA.png"
              priority
              width={0}
              height={0}
              className="mt-[15%] ml-[10%] sara-image"
              alt=""
              sizes="100vw"
            />
          </div> */}

          <div className="z-10 sara-background-lg" />
        </div>
      </div>
    </div>
  );
}
