import { GetQuestion } from "@/Components/lib/action/GetQuestion.action";
import QuestionForm from "../../components/QuestionForm";
import React from "react";
import { notFound } from "next/navigation";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: question, success } = await GetQuestion({
    questionId: id,
    title: "",
    content: "",
    tags: [],
  });

  if (!success) {
    return notFound();
  }

  console.log(question);

  return <QuestionForm question={question} isEdit={true} />;
}

export default Page;
