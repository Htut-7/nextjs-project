import React from "react";
import Button from "@/Components/Button";
import Google from "@/public/google.webp";
import Github from "@/public/github.jpg";

function AuthForm() {
  return (
    <div>
      <div className="flex  space-x-3">
        <Button icon={Google} type="outline">
          Login with Google
        </Button>

        <Button icon={Github} type="outline">
          Login with Github
        </Button>
      </div>
    </div>
  );
}

export default AuthForm;
