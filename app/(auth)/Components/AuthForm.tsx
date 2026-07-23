"use client";
import React from "react";
import Button from "@/Components/Button";
import Google from "@/public/google.webp";
import Github from "@/public/github.jpg";
import { Bounce, toast } from "react-toastify";
import { signIn } from "next-auth/react";

function AuthForm() {
  const oAuthSignIn = async () => {
    try {
      await signIn("github", {
        redirectTo: "/",
      });
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <div>
      <div className="flex  space-x-3">
        <Button icon={Google} variant="outline">
          Login with Google
        </Button>

        <Button icon={Github} variant="outline" onClick={oAuthSignIn}>
          Login with Github
        </Button>
      </div>
    </div>
  );
}

export default AuthForm;
