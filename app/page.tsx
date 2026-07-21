import React from "react";
import Navbar from "../Components/Navbar";
import LeftSidebar from "../Components/LeftSidebar";
import { FaHome, FaSignOutAlt } from "react-icons/fa";

function page() {
  return (
    <>
      <Navbar />
      <LeftSidebar />
    </>
  );
}

export default page;
