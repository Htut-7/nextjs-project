import { Ianswer } from "@/database/answer.model";
import React from "react";
import Preview from "./Preview";
import VoteButtons from "./VoteButtons";

function AnswerCard({ answer }: { answer: Ianswer }) {
  const authorName = ((answer as any)?.author?.name as string) || "Annonymous";
  const upvotes = (answer as any)?.upvotes ?? 0;
  const downvotes = (answer as any)?.downvotes ?? 0;

  const initial = authorName?.charAt(0)?.toLowerCase?.() || "?";

  return (
    <article className="w-full  border-b-[0.5px] border-tertiary  shadow-sm transition hover:shadow  border-tertiary-800 dark:bg-tertiary-900 my-5 py-6">
      <header className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
            {authorName}{" "}
            <span className="text-gray-600">was answered 3 mins ago</span>
          </p>
        </div>
      </header>

      <div className="prose prose-slate max-w-none text-slate-800 dark:prose-invert dark:text-slate-100">
        <Preview content={answer.content} />
      </div>

      <footer className="mt-4 flex items-center justify-between">
        <VoteButtons
          type="answer"
          typeId={answer?._id}
          initialDownvotes={downvotes}
          initialUpvotes={upvotes}
        />
      </footer>
    </article>
  );
}

export default AnswerCard;
