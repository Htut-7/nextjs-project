import React from "react";
import Image, { StaticImageData } from "next/image";
import Google from "@/public/google.webp";
import Link from "next/link";

function ButtonLink({
  icon,
  children,
  variant = "normal",
  href,
  ...props
}: {
  icon?: string | StaticImageData;
  children: React.ReactNode;
  variant?: "normal" | "outline";
  href: string;
}) {
  return (
    <div>
      <Link
        href={href}
        {...props}
        className={` space-x-3  my-5 px-4 py-2 rounded-md w-full ${
          variant === "outline" ? "border-2 border-main" : "bg-main"
        }
        ${icon ? "flex items-center" : ""}
        `}
      >
        {icon && (
          <Image
            src={icon}
            alt="icon"
            width={30}
            height={30}
            className="aspect-square rounded-full object-cover"
          />
        )}
        <span>{children}</span>
      </Link>
    </div>
  );
}

export default ButtonLink;
