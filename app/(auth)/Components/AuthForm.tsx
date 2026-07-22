import React from "react";
import Button from "@/Components/Button";
import Google from "@/public/google.webp";
import Github from "@/public/github.jpg";
import { signIn } from "@/auth";

function AuthForm() {
  return (
    <div>
      <div className="flex  space-x-3">
        <Button icon={Google} type="outline">
          Login with Google
        </Button>

        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <Button icon={Github} type="outline">
            Login with Github
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
