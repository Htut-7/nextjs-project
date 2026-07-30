"use client";

import React, { useState } from "react";
import Editor from "@/Components/Editor";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import TagCard from "@/Components/TagCard";

function QuestionForm() {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<string[]>(["react", "vue"]);
  const [error, setError] = useState(null);
  const [newTag, setNewTag] = useState("");

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
      <Button>Create</Button>
    </div>
  );
}

export default QuestionForm;
