"use client";

import Editor from "./Editor";
import React, { useState } from "react";
import Button from "./Button";
import { CreateAnswer } from "./lib/action/CreateAnswer.action";
import { Bounce, toast } from "react-toastify";
import { GenerateAiAnswerAction } from "./lib/action/GenerateAiAnswerAction";

function AnswerForm({
  questionId,
  questionTitle,
  questionContent,
}: {
  questionId: string;
  questionTitle: string;
  questionContent: string;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await CreateAnswer({
        questionId,
        content,
      });

      if (result.success) {
        setContent("");

        toast.success("Answer Submitted Successfully", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.error(result.message || "Failed to submit answer");
      }
    } catch (e) {
      console.log("Client Error", e);
    } finally {
      setLoading(false);
    }
  };

  const generateAiAnswer = async () => {
    try {
      setLoading(true);

      console.log("Generate AI clicked");

      console.log({
        title: questionTitle,
        content: questionContent,
        userAnswer: content,
      });

      const result = await GenerateAiAnswerAction({
        title: questionTitle,
        content: questionContent,
        userAnswer: content,
      });

      console.log("AI RESULT:", result);

      if (result.success && result.data) {
        setContent(result.data.answer);
      } else {
        toast.error(result.message || "Failed to generate AI answer");
      }
    } catch (e) {
      console.error("AI Client Error:", e);

      if (e instanceof Error) {
        toast.error(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="mt-3">
        <Editor
          value={content}
          onChange={(v) => {
            setContent(v);
          }}
          label="Any Question"
        />
      </div>

      <div className="flex justify-end">
        <div className="flex w-[50%] space-x-3">
          <div className="w-[50%]">
            {content.length >= 10 && (
              <Button
                type="button"
                variant="outline"
                onClick={generateAiAnswer}
              >
                {loading ? "Loading..." : "Generate AI Answer"}
              </Button>
            )}
          </div>

          <div className=" w-[50%] ">
            <Button type="submit">Submit Answer</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AnswerForm;
