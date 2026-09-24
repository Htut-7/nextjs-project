"use client";

import React, { useEffect, useState } from "react";
import { VoteAction } from "./lib/action/VoteAction.action";
import { Bounce, toast } from "react-toastify";
import { GetUserVote } from "./lib/action/GetUserVote.action";

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
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(null);

  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    const fetchUserVote = async () => {
      const { success, data } = await GetUserVote({
        type,
        typeId,
      });
      if (success && data) {
        setUserVote(data.userVote);
      }
    };
    fetchUserVote();
  }, [type, typeId]);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    try {
      setIsVoting(true);

      const { success, data, message } = await VoteAction({
        type,
        typeId,
        voteType,
      });

      if (!success) {
        toast.error(message || "Failed to vote", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });

        return;
      }

      if (data) {
        setUpVotes(data.upvotes);
        setDownVotes(data.downvotes);
        setUserVote(data.userVote);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex items-center space-x-2 text-xs">
      <button
        type="button"
        disabled={isVoting}
        className={`rounded-lg border border-white p-2 space-x-2 ${
          userVote === "upvote" ? "border-green-300 text-green-300" : ""
        }`}
        onClick={() => handleVote("upvote")}
      >
        <span>{upvotes}</span>
        <span>Likes</span>
      </button>

      <button
        type="button"
        disabled={isVoting}
        className={`rounded-lg border border-white p-2 space-x-2 ${
          userVote === "downvote" ? "border-red-300 text-red-300" : ""
        }`}
        onClick={() => handleVote("downvote")}
      >
        <span>{downvotes}</span>
        <span>Dislikes</span>
      </button>
    </div>
  );
}

export default VoteButtons;
