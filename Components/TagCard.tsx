import React from "react";
import Link from "next/link";

function TagCard({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Link
        href={href}
        className="inline-flex min-w-[100px] items-center justify-center rounded-full bg-tertiary px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </div>
  );
}

export default TagCard;
