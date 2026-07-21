import React from "react";
import Image, { StaticImageData } from "next/image";
import Google from "@/public/google.webp";

function Button({
  icon,
  children,
  type = "normal",
}: {
  icon?: string | StaticImageData;
  children: React.ReactNode;
  type?: "normal" | "outline";
}) {
  return (
    <div>
      <button
        className={` space-x-3   px-4 py-2 rounded-md w-full ${
          type === "outline" ? "border-2 border-main" : "bg-main"
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
      </button>
    </div>
  );
}

export default Button;
