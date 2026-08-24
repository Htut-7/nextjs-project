import React from "react";
import Link from "next/link";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import ROUTES from "@/ROUTES";

import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

async function LeftSidebar() {
  let session = await auth();
  let user = session?.user;

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

        {!user && (
          <li className=" px-3 py-3 rounded-xl border-2 border-main">
            <Link
              href={ROUTES.LOGIN}
              className="text-[16px] font-bold flex items-center space-x-3.5"
            >
              <FaHome />
              <span>Login</span>
            </Link>
          </li>
        )}

        {user && (
          <li className="bg-red-500 px-3 py-3 rounded-xl">
            <form
              action={async () => {
                "use server";

                await signOut({ redirect: false });
                redirect(ROUTES.LOGIN);
              }}
            >
              <button
                type="submit"
                className="text-[16px] font-bold flex items-center space-x-3.5"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </form>
          </li>
        )}
      </ul>
    </div>
  );
}

export default LeftSidebar;
