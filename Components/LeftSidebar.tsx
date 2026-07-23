import React from "react";
import Link from "next/link";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import ROUTES from "@/ROUTES";

function LeftSidebar() {
  return (
    <div className="w-1/5 px-5 py-2">
      <ul className="space-y-6">
        <li className="bg-main px-3 py-3 rounded-xl">
          <Link
            href={ROUTES.HOME}
            className="text-[16px] font-bold flex items-center space-x-3.5"
          >
            <FaHome />
            <span>Home</span>
          </Link>
        </li>

        <li className="bg-primary px-3 py-3 rounded-xl">
          <Link
            href={ROUTES.QUESTIONS}
            className="text-[16px] font-bold flex items-center space-x-3.5"
          >
            <FaHome />
            <span>Newest</span>
          </Link>
        </li>

        <li className="bg-main px-3 py-3 rounded-xl">
          <Link
            href={ROUTES.QUESTIONS}
            className="text-[16px] font-bold flex items-center space-x-3.5"
          >
            <FaHome />
            <span>Ask a new question</span>
          </Link>
        </li>

        <li className="bg-main px-3 py-3 rounded-xl">
          <Link
            href={ROUTES.QUESTIONS}
            className="text-[16px] font-bold flex items-center space-x-3.5"
          >
            <FaHome />
            <span>Popular</span>
          </Link>
        </li>

        <li className="bg-red-500 px-3 py-3 rounded-xl">
          <Link
            href={ROUTES.QUESTIONS}
            className="text-[16px] font-bold flex items-center space-x-3.5"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default LeftSidebar;
