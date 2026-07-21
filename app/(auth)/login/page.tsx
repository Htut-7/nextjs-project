import React from "react";
import Image from "next/image";
import logo from "../../../public/logo1.jpg";
import Input from "@/Components/Input";
import Google from "@/public/google.webp";
import Github from "@/public/github.jpg";
import Button from "../../../Components/Button";

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
          <Button type="outline">Create new account?</Button>
        </div>
      </div>
      <div className="w-2/4 h-screen flex justify-center items-center">
        <div className="w-[80%] space-y-6">
          <h3 className="text-xl font-semibold">
            Sign into Trae <span className="text-main">Coder</span> Forum
          </h3>
          <div>
            <Input placeholder="Enter your Email" label="Email Address" />
          </div>

          <div>
            <Input placeholder="Enter your Password" label="Password" />
          </div>

          <div>
            <Button type="normal">Login</Button>
          </div>

          <div className="flex  space-x-3">
            <Button icon={Google} type="outline">
              Login with Google
            </Button>

            <Button icon={Github} type="outline">
              Login with Github
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
