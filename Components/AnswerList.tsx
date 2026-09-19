import React from "react";
import { Ianswer } from "@/database/answer.model";

function AnswerList({
  answers,
  success,
  errorMessage,
  totalAnswers,
}: {
  answers: Ianswer[];
  success: boolean;
  errorMessage?: string;
  totalAnswers: number;
}) {
  return <div>AnswerList - {totalAnswers}</div>;
}

export default AnswerList;
