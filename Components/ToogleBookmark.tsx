"use client";

import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { ToogleBookmarkAction } from "./lib/action/ToogleBookmarkAction.action";

function ToogleBookmark() {
  const [isSave, setIsSave] = useState(false);

  const handleSave = async () => {
    await ToogleBookmarkAction();
  };

  return (
    <div>
      {!isSave ? (
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-card/60 hover:bg-main/15 text-gray-300 hover:text-main transition-all duration-200 active:scale-90"
          onClick={handleSave}
          aria-label="Save bookmark"
          title="Save bookmark"
        >
          <FaRegBookmark size={20} />
        </button>
      ) : (
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-main/15 text-main transition-all duration-200 active:scale-90"
          onClick={handleSave}
          aria-label="Remove bookmark"
          title="Remove bookmark"
        >
          <FaBookmark size={20} className="drop-shadow" />
        </button>
      )}
    </div>
  );
}

export default ToogleBookmark;
