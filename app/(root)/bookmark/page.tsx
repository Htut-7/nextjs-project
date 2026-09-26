import React from "react";
import { auth } from "@/auth";
import Filters from "@/Components/Filters";
import ThreadCard from "@/Components/ThreadCard";
import DataRenderer from "@/Components/DataRenderer";
import { FaBookmark } from "react-icons/fa6";
import { GetBookmarkCollection } from "@/Components/lib/action/GetBookmarkCollection.action";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}) {
  const session = await auth();
  const { page, pageSize, search, filter } = await searchParams;
  console.log(session);
  const { success, data, message } = await GetBookmarkCollection({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || "",
    filter: filter || "",
  });

  const { collection = [] } = data || {};

  return (
    <>
      <div className="mx-auto max-w-5xl px-5 pt-8 pb-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-main/20 via-primary/40 to-card p-8 ring-1 ring-main/20">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-main/10 blur-3xl" />
          <div className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-main/10 blur-3xl" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-main/25 text-main ring-1 ring-main/40">
                <FaBookmark size={26} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Saved Threads</h1>
                <p className="mt-1 text-sm text-gray-300/80">
                  Your personal collection of bookmarked questions and answers.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-xl bg-card/60 px-4 py-2 text-gray-200 ring-1 ring-white/5 sm:self-center">
              <FaBookmark size={14} className="text-main" />
              <span className="text-sm font-medium tabular-nums">
                {collection.length} saved
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-4">
        <Filters />
      </div>

      <div className="mx-auto max-w-5xl px-5 pb-10">
        <DataRenderer
          success={success}
          data={collection}
          errorMessage={message}
          render={(collection) =>
            collection.map((collections) => (
              <ThreadCard
                key={collections._id.toString()}
                question={collections.question}
              />
            ))
          }
        />
      </div>
    </>
  );
}

export default page;
