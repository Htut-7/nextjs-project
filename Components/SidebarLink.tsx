"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <li
      className={`px-3 py-3 rounded-xl ${
        isActive ? "bg-main" : "bg-primary"
      }`}
    >
      <Link
        href={href}
        className="text-[16px] font-bold flex items-center space-x-3.5"
      >
        {children}
      </Link>
    </li>
  );
}

export default SidebarLink;
