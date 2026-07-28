"use client";

import React, { useState } from "react";
import Editor from "@/Components/Editor";

function QuestionForm() {
  const [value, setValue] = useState("");

  return (
    <>
      <Editor value={value} onChange={(v) => setValue(v)} />
    </>
  );
}

export default QuestionForm;
