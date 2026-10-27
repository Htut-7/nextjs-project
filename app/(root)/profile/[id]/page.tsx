import AnswerCard from "@/Components/AnswerCard";
import DataRenderer from "@/Components/DataRenderer";
import { GetUserId } from "@/Components/lib/action/GetUser";
import { GetUserAnswer } from "@/Components/lib/action/GetUserAnswer.action";
import { GetUserQuestion } from "@/Components/lib/action/GetUserQuestion.action";
import ProfileHeader from "@/Components/ProfileHeader";
import ThreadCard from "@/Components/ThreadCard";
import React from "react";
import { success } from "zod";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const result = await GetUserId({
    userId: id,
  });

  if (!result.success || !result.data) {
    throw new Error(result.message || "Failed to load user");
  }

  const { user, totalQuestion, totalAnswer } = result.data;

  const { success, data, message } = await GetUserQuestion({
    userId: id,
  });

  const { question = [] } = data || {};

  const {
    success: answerSuccess,
    data: answerData,
    message: answerError,
  } = await GetUserAnswer({
    userId: id,
  });

  const { answer = [] } = answerData || {};

  return (
    <div>
      <ProfileHeader
        user={user}
        totalQuestion={totalQuestion}
        totalAnswer={totalAnswer}
      />

      <DataRenderer
        success={success}
        data={question}
        errorMessage={message}
        render={(questions) =>
          questions.map((question) => (
            <ThreadCard key={question._id.toString()} question={question} />
          ))
        }
      />

      <DataRenderer
        success={answerSuccess}
        data={answer}
        errorMessage={answerError}
        render={(answers) =>
          answers.map((answer) => (
            <AnswerCard answer={answer} key={answer._id.toString()} />
          ))
        }
      />
    </div>
  );
}

export default page;
