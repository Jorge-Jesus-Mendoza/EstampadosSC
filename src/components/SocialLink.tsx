import Link from "next/link";
import React from "react";

interface Props {
  name: string;
  url: string;
}

export const SocialLink = ({ name, url }: Props) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="bg-white social-link h-1 flex justify-center items-center rounded-3xl link-expanded"
    >
      {" "}
      {name}
    </Link>
  );
};
