"use client";

import React, { useState } from "react";
import Editor from "@/Components/Editor";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import TagCard from "@/Components/TagCard";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ROUTES from "@/ROUTES";
import { QuestionCreate } from "@/Components/lib/action/QuestionCreate.action";

function QuestionForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>(["react", "vue"]);
  const [error, setError] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");

  const router = useRouter();

  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setNewTag("");
        setError(null);
      } else {
        setError("you are adding an existing tag");
      }
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let result = await QuestionCreate({
        title,
        content,
        tags,
      });

      console.log("QUESTION CREATE RESULT:", result);
      console.log("SUCCESS:", result.success);
      console.log("DATA:", result.data);
      console.log("QUESTION ID:", result.data?._id);

      if (result.success && result.data) {
        toast.success("Question Created Successfully", {
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
        router.push(ROUTES.QUESTION_DETAILS(result.data?._id));
      }
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
    <form className="space-y-5" onSubmit={submit}>
      <h1 className="text-2xl font-bold">Ask A New Question</h1>
      <Input
        label="Question Title"
        text="Describe your question title in short way"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="mt-3">
        <Editor
          value={content}
          onChange={(v) => setContent(v)}
          label="Any Question"
        />
      </div>

      <Input
        onKeyDown={enterHandler}
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        label="Tags"
        text="Please press enter to add a new Tag"
      />

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <div className="mt-5 flex items-center space-x-3">
        {tags.map((t, i) => (
          <TagCard key={i} href="/filters/react">
            {t}
          </TagCard>
        ))}
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
}

export default QuestionForm;
