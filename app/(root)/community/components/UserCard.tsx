import React from "react";
import Image from "next/image";
import Link from "next/link";

function UserCard({
  name,
  image,
  id,
}: {
  name: string;
  image: string;
  id: string;
}) {
  console.log("UserCard:", {
    name,
    image,
    id,
  });
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div>
      <Link
        href={`/users/${id}`}
        className="flex flex-col items-center justify-center bg-tertiary p-4 rounded-xl hover:ring-1 hover:ring-main/50 transition-all duration-200 group"
      >
        {image ? (
          <Image
            alt={name}
            width={100}
            height={100}
            src={image}
            className="aspect-square rounded-full object-cover ring-2 ring-main/40 group-hover:ring-main/70 transition-all"
          />
        ) : (
          <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-main to-primary flex items-center justify-center ring-2 ring-main/40 group-hover:ring-main/70 transition-all">
            <span className="text-white font-bold text-2xl tracking-wide">
              {initials}
            </span>
          </div>
        )}
        <p className="mt-3 text-sm font-medium text-gray-200 text-center truncate w-full">
          {name}
        </p>
      </Link>
    </div>
  );
}

export default UserCard;
