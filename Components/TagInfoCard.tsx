import React from "react";
import Image from "next/image";

function TagInfoCard({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex flex-col items-center justify-center bg-tertiary p-2 rounded-xl">
      <Image
        alt="logo"
        width={100}
        height={100}
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name.toLowerCase()}/${name.toLowerCase()}-original.svg`}
      ></Image>
      <p>
        {name} - ({count})
      </p>
    </div>
  );
}

export default TagInfoCard;
