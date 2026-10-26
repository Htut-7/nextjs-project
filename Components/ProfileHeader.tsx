import React from "react";
import Image from "next/image";
import { Iuser } from "@/database/user.model";
import { FaStar, FaEnvelope, FaLocationDot, FaLink } from "react-icons/fa6";

function ProfileHeader({
  user,
  totalQuestion,
  totalAnswer,
}: {
  user: Iuser;
  totalQuestion: number;
  totalAnswer: number;
}) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <section className="flex flex-col sm:flex-row gap-6 rounded-xl bg-card p-6 sm:p-8">
      {user.image ? (
        <Image
          src={user.image}
          alt={user.name}
          width={120}
          height={120}
          className="w-[120px] h-[120px] shrink-0 rounded-full object-cover ring-2 ring-main/40"
        />
      ) : (
        <div className="w-[120px] h-[120px] shrink-0 rounded-full bg-gradient-to-br from-main to-primary flex items-center justify-center ring-2 ring-main/40">
          <span className="text-white font-bold text-4xl tracking-wide">
            {initials}
          </span>
        </div>
      )}

      <div className="flex-1 space-y-3">
        <div>
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-sm text-gray-400">@{user.username}</p>
        </div>

        {user.bio && <p className="text-gray-300">{user.bio}</p>}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-300">
          {user.location && (
            <span className="flex items-center gap-2">
              <FaLocationDot className="text-main" />
              {user.location}
            </span>
          )}

          {user.portfolio && (
            <a
              href={user.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-main transition-colors duration-200"
            >
              <FaLink className="text-main" />
              {user.portfolio}
            </a>
          )}

          <a
            href={`mailto:${user.email}`}
            className="flex items-center gap-2 hover:text-main transition-colors duration-200"
          >
            <FaEnvelope className="text-main" />
            {user.email}
          </a>

          <span className="flex items-center gap-2">
            <FaStar className="text-main" />
            <span className="tabular-nums">{user.reputation ?? 0}</span>
            <span className="text-gray-400">reputation</span>
          </span>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <div className="rounded-lg bg-tertiary px-4 py-2">
            <span className="block text-lg font-bold text-white tabular-nums">
              {totalQuestion}
            </span>
            <span className="text-xs text-gray-400">Questions</span>
          </div>

          <div className="rounded-lg bg-tertiary px-4 py-2">
            <span className="block text-lg font-bold text-white tabular-nums">
              {totalAnswer}
            </span>
            <span className="text-xs text-gray-400">Answers</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;
