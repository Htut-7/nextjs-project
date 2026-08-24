import React from "react";
import Image from "next/image";
import logo from "../public/logo1.jpg";
import SearchInput from "./SearchInput";
import { auth } from "@/auth";

async function page() {
  let session = await auth();
  let user = session?.user;

  return (
    <nav className="flex justify-between px-10 py-6">
      <div className="flex items-center justify-center space-x-4">
        <Image
          src={logo}
          alt="logo"
          className="rounded-full"
          width={60}
          height={60}
        />
        <h1 className="font-bold">
          Trae <span className="text-main">Coder</span>
        </h1>
      </div>
      <div className="w-[600px]">
        <SearchInput />
      </div>
      <div>
        {user && (
          <Image
            src={user?.image || "default-avatar.png"}
            alt="logo"
            className="aspect-square rounded-full object-cover"
            width={45}
            height={45}
          />
        )}
      </div>
    </nav>
  );
}

export default page;
