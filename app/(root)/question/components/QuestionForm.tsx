"use client";

import React, { useState } from "react";
import Editor from "@/Components/Editor";
import Input from "@/Components/Input";
import Button from "@/Components/Button";

function QuestionForm() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Ask A New Question</h1>
      <Input
        label="Question Title"
        text="Describe your question title in short way"
      />
      <div className="mt-3">
        <Editor
          value={value}
          onChange={(v) => setValue(v)}
          label="Any Question"
        />
      </div>
      <Input label="Tags" text="Please press enter to add a new Tag" />
      <Button>Create</Button>
    </div>
  );
}

export default QuestionForm;
