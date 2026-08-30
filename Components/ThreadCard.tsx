import React from "react";
import Image from "next/image";
import Profile from "@/public/Profile.jpg";
import { AiFillLike } from "react-icons/ai";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import TagCard from "./TagCard";
import { IquestionDoc } from "@/database/question.model";

function ThreadCard({ question }: { question: IquestionDoc }) {
  return (
    <div className="px-10 py-5 rounded-xl bg-card space-y-8 my-3">
      <h1 className="text-xl font-bold">{question.title}</h1>
      <div className="flex flex-wrap gap-3">
        {question?.tags.map((tag, i) => (
          <TagCard href={`/filters/${tag?.name}`} key={i}>
            {tag.name}
          </TagCard>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 text-gray-300 text-[14px]">
          <Image
            src={Profile}
            alt="logo"
            className="aspect-square rounded-full object-cover"
            width={30}
            height={30}
          />
          <span>{question.author?.name} . asked 3 mins ago</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-gray-300 text-[14px]">
            <span>
              <AiFillLike />
            </span>
            <span>{question?.upvotes}Likes</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-300 text-[14px]">
            <span>
              <RiQuestionAnswerFill />
            </span>
            <span>{question?.answers} Answers</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-300 text-[14px]">
            <span>
              <FaEye />
            </span>
            <span>{question?.views} Views</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadCard;
