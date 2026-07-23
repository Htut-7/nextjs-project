import React from "react";
import Image from "next/image";
import logo from "../../../public/logo1.jpg";
import Input from "@/Components/Input";
import AuthForm from "../Components/AuthForm";
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
          <Button variant="outline">Create new account?</Button>
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
            <Button variant="normal">Login</Button>
          </div>

          <AuthForm />
        </div>
      </div>
    </div>
  );
}

export default page;
