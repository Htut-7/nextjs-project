import React from "react";
import Navbar from "../../Components/Navbar";
import LeftSidebar from "../../Components/LeftSidebar";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { auth } from "@/auth";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ search: string | undefined }>;
}) {
  const session = await auth();
  const { search } = await searchParams;
  console.log(session);
  return <>{search}</>;
}

export default page;
