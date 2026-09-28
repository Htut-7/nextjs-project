import React from "react";
import { Ianswer } from "@/database/answer.model";
import DataRenderer from "./DataRenderer";
import AnswerCard from "./AnswerCard";
import CommonFilters from "./CommonFilters";
import { AnswerFilters, DefaultFilters } from "@/constant/filter";

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
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl">AnswerList - {totalAnswers}</h3>
        <CommonFilters
          filter={AnswerFilters}
          defaultFilters={DefaultFilters.AnswerFilters}
        />
      </div>
      <DataRenderer
        success={success}
        errorMessage={errorMessage}
        data={answers}
        render={(answers) => {
          return answers.map((answer) => {
            return <AnswerCard answer={answer} key={answer._id.toString()} />;
          });
        }}
      />
    </div>
  );
}

export default AnswerList;
