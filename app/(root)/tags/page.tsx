import React from "react";
import { auth } from "@/auth";
import DataRenderer from "@/Components/DataRenderer";
import { GetTags } from "@/Components/lib/action/GetTags.action";
import TagInfoCard from "@/Components/TagInfoCard";
import CommonFilters from "@/Components/CommonFilters";
import { DefaultFilters, TagFilters } from "@/constant/filter";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}) {
  const session = await auth();
  const { page, pageSize, search, filter } = await searchParams;
  const { success, data, message } = await GetTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || "",
    filter: filter || "",
  });

  const { tags = [] } = data || {};

  return (
    <>
      <div className="flex justify-between items-center p-5">
        <h1 className="text-3xl font-bold">All Tags</h1>
        <CommonFilters
          filter={TagFilters}
          defaultFilters={DefaultFilters.TagFilters}
        />
      </div>

      <DataRenderer
        success={success}
        data={tags}
        errorMessage={message}
        render={(tags) => {
          return (
            <div className="grid grid-cols-4 gap-4">
              {tags.map((tag) => (
                <TagInfoCard
                  name={tag.name}
                  key={tag._id.toString()}
                  count={tag.questions}
                  id={tag._id.toString()}
                />
              ))}
            </div>
          );
        }}
      />
    </>
  );
}

export default page;
