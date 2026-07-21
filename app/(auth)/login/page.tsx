import React from "react";
import Image from "next/image";
import logo from "../../../public/logo1.jpg";
import Input from "@/Components/Input";
import Google from "@/public/google.webp";
import Github from "@/public/github.jpg";

function page() {
  return (
    <div className="flex">
      <div className="w-2/4 p-10 bg-primary h-screen  flex justify-center items-center">
        <div className="space-y-10">
          <div className="flex items-center space-x-4 ">
            <Image src={logo} alt="logo" width={100} height={100} />
            <h1 className="text-5xl font-semibold">
              Trae <span className="text-main">Coder</span> Forum
            </h1>
          </div>
          <p className="text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et
            aspernatur consectetur libero corporis earum ab molestiae
            perferendis nam, maiores consequuntur aut asperiores voluptatum
            fugit velit, vero voluptates aliquam tenetur possimus!
          </p>
          <button className="px-4 py-2 rounded-lg border-2 border-main w-full">
            Create a new account?
          </button>
        </div>
      </div>
      <div className="w-2/4 h-screen flex justify-center items-center">
        <div className="w-[80%] space-y-6">
          <h3 className="text-xl font-semibold">
            Sign into Trae <span className="text-main">Coder</span> Forum
          </h3>
          <div className="space-y-3">
            <Input placeholder="Enter your Email" label="Email Address" />
          </div>

          <div className="space-y-3">
            <Input placeholder="Enter your Password" label="Password" />
          </div>

          <div>
            <button className="px-4 py-2 rounded-lg bg-main w-full">
              Login
            </button>
          </div>

          <div className="flex  space-x-5">
            <button className="flex space-x-3 items-center border-2 border-main px-4 py-2 rounded-md w-full">
              <Image
                src={Google}
                alt="google"
                width={30}
                height={30}
                className="aspect-square rounded-full object-cover"
              />
              <span>Login with Google</span>
            </button>

            <button className="flex space-x-3 items-center border-2 border-main px-4 py-2 rounded-md w-full">
              <Image
                src={Github}
                alt="google"
                width={30}
                height={30}
                className="rounded-full"
              />
              <span>Login with Github</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
