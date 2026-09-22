import { GetQuestion } from "@/Components/lib/action/GetQuestion.action";
import { notFound } from "next/navigation";
import React from "react";
import TagCard from "@/Components/TagCard";
import Preview from "@/Components/Preview";
import { after } from "next/server";
import { ViewCount } from "@/Components/lib/action/ViewCounts.action";
import AnswerForm from "@/Components/AnswerForm";
import { GetAnswers } from "@/Components/lib/action/GetAnswers.action";
import AnswerList from "@/Components/AnswerList";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let { data: question } = await GetQuestion({
    questionId: id,
    title: "",
    content: "",
    tags: [],
  });

  if (!question) {
    notFound();
  }

  after(async () => {
    await ViewCount({
      questionId: id,
    });
  });

  const {
    success,
    message,
    data: answerData,
  } = await GetAnswers({
    page: 1,
    pageSize: 10,
    filter: "latest",
    questionId: id,
  });

  const { answers = [], totalAnswers = 0 } = answerData || {};

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{question.title}</h1>
        <div className="flex justify-center gap-3 text-xs text-gray-200">
          <div>{question.upvotes} Likes</div>
          <div>{question.downvotes} Dislikes</div>
          <div>{question.answers} Answers</div>
          <div>{question.views} Views</div>
        </div>
      </div>
      <div className="my-3">
        <Preview content={question.content} />
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <TagCard
            key={tag._id.toString()}
            href={`/tags/${tag._id.toString()}`}
          >
            {tag.name}
          </TagCard>
        ))}
      </div>

      <div className="my-3">
        <AnswerList
          success={success}
          errorMessage={message}
          answers={answers}
          totalAnswers={totalAnswers}
        />
      </div>

      <div className="my-3">
        <AnswerForm
          questionId={id}
          questionTitle={question.title}
          questionContent={question.content}
        />
      </div>
    </div>
  );
}
