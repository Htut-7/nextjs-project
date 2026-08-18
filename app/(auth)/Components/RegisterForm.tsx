"use client";

import React, { useState } from "react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import AuthForm from "./AuthForm";
import { signupWithCredentials } from "@/Components/lib/action/signupWithCredentials.action";
import { useRouter } from "next/navigation";
import ROUTES from "@/ROUTES";

type FormData = {
  name: string;
  email: string;
  username: string;
  password: string;
};

type FormErrors = {
  name?: string[];
  email?: string[];
  username?: string[];
  password?: string[];
};

function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors | null>(null);

  const router = useRouter();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(null);

    const result = await signupWithCredentials(formData);

    if (result.success) {
      router.push(ROUTES.HOME);
    }
    if ("details" in result && result.details) {
      setErrors(result.details as FormErrors);
    }
    if ("message" in result && result.message === "Email already exists") {
      setErrors({
        email: [result.message],
      });
    }
    if ("message" in result && result.message === "Username already exists") {
      setErrors({
        username: [result.message],
      });
    }
  };

  return (
    <form className="w-[80%] space-y-6" onSubmit={register}>
      <h3 className="text-xl font-semibold">
        Sign Up to Trae <span className="text-main">Coder</span> Forum
      </h3>

      <div>
        <Input
          placeholder="Enter your name"
          label="Name"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        {errors?.name && (
          <p className="my-2 text-xs text-red-500">{errors.name[0]}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Enter Username"
          label="Username"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
        />
        {errors?.username && (
          <p className="my-2 text-xs text-red-500">{errors.username[0]}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Enter your Email"
          label="Email Address"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        {errors?.email && (
          <p className="my-2 text-xs text-red-500">{errors.email[0]}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Enter your Password"
          label="Password"
          type="password"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />
        {errors?.password && (
          <p className="my-2 text-xs text-red-500">{errors.password[0]}</p>
        )}
      </div>

      <div>
        <Button variant="normal" type="submit">
          Register
        </Button>
      </div>

      <AuthForm />
    </form>
  );
}

export default RegisterForm;
