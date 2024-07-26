import SocialLink from "@/components/SocialLink";
import Image from "next/image";

const mockData = [
  { name: "Twitter", url: "https://x.com/home" },
  { name: "Instagram", url: "https://www.instagram.com/" },
  { name: "Facebook", url: "https://www.facebook.com/" },
];

export default function Home() {
  return (
    <div>
      <div className="flex justify-end p-2">
        <a
          href={"/Jorge_Mendoza_CV.pdf"}
          className="p-5 rounded-3xl download-button"
        >
          Descarga nuestro catalogo
        </a>
      </div>

      <div className="flex flex-col text-center items-center  justify-center mt-4 p-0">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />

        <h1 className="mt-8">
          <b>ESTAMPADOS</b> <br />
          PERSONALIZADOS
        </h1>

        <div className="flex flex-col gap-4 w-full justify-center items-center mt-4 social-column">
          {mockData.map((data) => (
            <SocialLink key={data.name} {...data} />
          ))}
        </div>

        <div className="sara-container w-full flex justify-end m-0">
          <div className="bg-white flex justify-end sara-background">
            <Image
              src="/images/woman_placeholder.png"
              width={0}
              height={0}
              className="mt-[15%] sara-image"
              alt=""
              sizes="100vw"
              // style={{ width: "70%", height: "auto" }} // optional
            />
          </div>
        </div>
      </div>
    </div>
  );
}
