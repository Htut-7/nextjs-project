import React from "react";
import Navbar from "../../Components/Navbar";
import LeftSidebar from "../../Components/LeftSidebar";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { auth } from "@/auth";
import Filters from "@/Components/Filters";
import ThreadCard from "@/Components/ThreadCard";
import ButtonLink from "@/Components/ButtonLink";
import ROUTES from "@/ROUTES";
import fetchHandler from "@/Components/lib/fetchHandler";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    search: string | undefined;
    filter: string | undefined;
  }>;
}) {
  const session = await auth();
  const { search, filter } = await searchParams;
  // const response = await fetchHandler("http://localhost:3000/api/users");
  // console.log(response);
  return (
    <>
      <div className="flex justify-between items-center p-5">
        <div className="text-3xl font-bold">
          <h1>All Threads</h1>
        </div>
        <div>
          <ButtonLink href={ROUTES.ASK}>Create New Thread</ButtonLink>
        </div>
      </div>
      <Filters />
      <ThreadCard />
    </>
  );
}

export default page;
