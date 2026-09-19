"use client";

import Editor from "./Editor";
import React, { useState } from "react";
import Button from "./Button";
import { CreateAnswer } from "./lib/action/CreateAnswer.action";
import { Bounce, toast } from "react-toastify";
import ROUTES from "@/ROUTES";
import router from "next/router";

function AnswerForm({ questionId }: { questionId: string }) {
  const [content, setContent] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const result = await CreateAnswer({
        questionId,
        content,
      });
      console.log(result);
      if (result.success) {
        console.log("About to show toast");
        toast.success("Answer Submitted Successfully", {
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
        // router.push(ROUTES.QUESTION_DETAILS(questionId));
      } else {
        console.log("Server Action", result.message);
        toast.error(result.message || "Failed to submit answer");
      }
    } catch (e) {
      //   if (e instanceof Error) {
      //     toast.error(e.message, {
      //       position: "top-center",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: false,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "dark",
      //       transition: Bounce,
      //     });
      //   }
      console.log("Client Error", e);
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="mt-3">
        <Editor
          value={content}
          onChange={(v) => setContent(v)}
          label="Any Question"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Submit Answer</Button>
      </div>
    </form>
  );
}

export default AnswerForm;
