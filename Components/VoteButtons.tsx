"use client";

import React, { useState } from "react";

function VoteButtons({
  type,
  typeId,
  initialUpvotes,
  initialDownvotes,
}: {
  type: "question" | "answer";
  typeId: string;
  initialUpvotes: number;
  initialDownvotes: number;
}) {
  const [upvotes, setUpVotes] = useState(initialUpvotes);
  const [downvotes, setDownVotes] = useState(initialDownvotes);
  const [uservotes, setUserVotes] = useState<"upvote" | "downvote" | null>(
    null
  );

  const handleVote = (voteType: "upvote" | "downvote") => {
    setUpVotes(100);
    setDownVotes(100);
    setUserVotes(voteType);
  };

  return (
    <div className="flex items-center space-x-2 text-xs">
      <div>
        <button
          className={`p-2 border-[1px] border-white space-x-2 rounded-lg ${uservotes === "upvote" ? "border-green-300 text-green-300" : ""}`}
          onClick={() => handleVote("upvote")}
        >
          <span>{upvotes}</span>
          <span>Likes</span>
        </button>
      </div>

      <div>
        <button
          className={`p-2 border-[1px] border-white space-x-2 rounded-lg ${uservotes === "downvote" ? "border-red-300 text-red-300" : ""}`}
          onClick={() => handleVote("downvote")}
        >
          <span>{downvotes}</span>
          <span>Dislikes</span>
        </button>
      </div>
    </div>
  );
}

export default VoteButtons;
