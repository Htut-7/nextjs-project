import React from "react";
import Link from "next/link";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import ROUTES from "@/ROUTES";

import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import SidebarLink from "@/Components/SidebarLink";

async function LeftSidebar() {
  let session = await auth();
  let user = session?.user;

  return (
    <div className="w-1/5 px-5 py-2">
      <ul className="space-y-6">
        <SidebarLink href={ROUTES.HOME}>
          <FaHome />
          <span>Home</span>
        </SidebarLink>

        <SidebarLink href={ROUTES.TAG}>
          <FaHome />
          <span>Tags</span>
        </SidebarLink>

        <SidebarLink href={ROUTES.BOOKMARK}>
          <FaHome />
          <span>Bookmark</span>
        </SidebarLink>

        <SidebarLink href={ROUTES.COMMUNITY}>
          <FaHome />
          <span>Community</span>
        </SidebarLink>

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
