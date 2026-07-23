import React from "react";
import Navbar from "../../Components/Navbar";
import LeftSidebar from "../../Components/LeftSidebar";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { auth } from "@/auth";

async function page() {
  const session = await auth();
  console.log(session);
  return <>{session?.user?.name}</>;
}

export default page;
