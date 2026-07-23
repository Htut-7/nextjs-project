import React from "react";
import Navbar from "@/Components/Navbar";
import LeftSidebar from "@/Components/LeftSidebar";
import RightSidebar from "@/Components/RightSidebar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <div className="w-3/5"> {children}</div>
        <div className="w-1/5">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default layout;
