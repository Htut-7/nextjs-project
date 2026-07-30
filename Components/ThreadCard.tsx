import Link from "next/link";
import React from "react";
import Image from "next/image";
import Profile from "@/public/Profile.jpg";
import { AiFillLike } from "react-icons/ai";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import TagCard from "./TagCard";

function ThreadCard() {
  return (
    <div className="px-10 py-5 rounded-xl bg-card space-y-8">
      <h1 className="text-xl font-bold">What is React Js? How does it work?</h1>
      <div className="flex flex-wrap gap-3">
        <TagCard href="/filters/react">React</TagCard>
        <TagCard href="/filters/vue">Vue</TagCard>
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
          <span>R lue . asked 3 mins ago</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-gray-300 text-[14px]">
            <span>
              <AiFillLike />
            </span>
            <span>1.2k Likes</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-300 text-[14px]">
            <span>
              <RiQuestionAnswerFill />
            </span>
            <span>200 Answers</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-300 text-[14px]">
            <span>
              <FaEye />
            </span>
            <span>4k Views</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadCard;
