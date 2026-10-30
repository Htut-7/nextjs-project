import AnswerCard from "@/Components/AnswerCard";
import DataRenderer from "@/Components/DataRenderer";
import { GetUserId } from "@/Components/lib/action/GetUser";
import { GetUserAnswer } from "@/Components/lib/action/GetUserAnswer.action";
import { GetUserQuestion } from "@/Components/lib/action/GetUserQuestion.action";
import ProfileHeader from "@/Components/ProfileHeader";
import ThreadCard from "@/Components/ThreadCard";
import { error } from "console";
import Link from "next/link";
import React from "react";
import { success } from "zod";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: { tab: string };
}) {
  const { id } = await params;

  const result = await GetUserId({
    userId: id,
  });

  const activeTab = searchParams.tab || "questions";

  if (!result.success || !result.data) {
    throw new Error(result.message || "Failed to load user");
  }

  const { user, totalQuestion, totalAnswer } = result.data;

  let isSuccess;
  let dataForLoop;
  let errorMessage;

  if (activeTab === "questions") {
    const { success, data, message } = await GetUserQuestion({
      userId: id,
    });

    const { question = [] } = data || {};
    isSuccess = success;
    dataForLoop = question;
    errorMessage = message;
  } else {
    const { success, data, message } = await GetUserAnswer({
      userId: id,
    });

    const { answer = [] } = data || {};
    isSuccess = success;
    dataForLoop = answer;
    errorMessage = message;
  }

  return (
    <div>
      <ProfileHeader
        user={user}
        totalQuestion={totalQuestion}
        totalAnswer={totalAnswer}
      />

      <div className="my-7 space-x-5">
        <Link
          href={`/profile/${id}?tab=questions`}
          className={` border-white border rounded-xl px-2 py-1 ${activeTab === "questions" ? "bg-main" : "bg-primary"}`}
        >
          Top Questions
        </Link>

        <Link
          href={`/profile/${id}?tab=answers`}
          className={` border-white border rounded-xl px-2 py-1 ${activeTab === "answers" ? "bg-main" : "bg-primary"}`}
        >
          Top Answers
        </Link>
      </div>

      {activeTab === "questions" ? (
        <DataRenderer
          success={isSuccess}
          data={dataForLoop}
          errorMessage={errorMessage}
          render={(questions) =>
            questions.map((question) => (
              <ThreadCard key={question._id.toString()} question={question} />
            ))
          }
        />
      ) : (
        <DataRenderer
          success={isSuccess}
          data={dataForLoop}
          errorMessage={errorMessage}
          render={(answers) =>
            answers.map((answer) => (
              <AnswerCard answer={answer} key={answer._id.toString()} />
            ))
          }
        />
      )}
    </div>
  );
}

export default page;
