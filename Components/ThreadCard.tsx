import React from "react";
import Image from "next/image";
import Link from "next/link";
import Profile from "@/public/Profile.jpg";
import { AiFillLike } from "react-icons/ai";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import TagCard from "./TagCard";
import { IquestionDoc } from "@/database/question.model";

function ThreadCard({ question }: { question: IquestionDoc }) {
  return (
    <div className="relative px-10 py-5 rounded-xl bg-card space-y-8 my-3">
      <Link
        href={`/question/${question._id}`}
        className="absolute inset-0 z-0 rounded-xl"
        aria-label={`Open ${question.title}`}
      />

      <h1 className="relative z-10 pointer-events-none text-xl font-bold">
        {question.title}
      </h1>

      <div className="relative z-20 flex flex-wrap gap-3">
        {question?.tags.map((tag) => (
          <TagCard href={`/filters/${tag?.name}`} key={tag._id.toString()}>
            {tag.name}
          </TagCard>
        ))}
      </div>

      <div className="relative z-10 pointer-events-none flex justify-between items-center">
        <div className="flex items-center space-x-3 text-gray-300 text-[14px]">
          <Image
            src={Profile}
            alt="logo"
            className="aspect-square rounded-full object-cover"
            width={30}
            height={30}
          />

          <span>{question.author?.name} · asked 3 mins ago</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-gray-300 text-[14px]">
            <AiFillLike />
            <span>{question?.upvotes} Likes</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-300 text-[14px]">
            <RiQuestionAnswerFill />
            <span>{question?.answers} Answers</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-300 text-[14px]">
            <FaEye />
            <span>{question?.views} Views</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadCard;
