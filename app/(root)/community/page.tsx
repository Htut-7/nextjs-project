import React from "react";
import { auth } from "@/auth";
import DataRenderer from "@/Components/DataRenderer";
import { GetTags } from "@/Components/lib/action/GetTags.action";
import TagInfoCard from "@/Components/TagInfoCard";
import { GetUser } from "@/Components/lib/action/GetUser.action";
import UserCard from "./components/UserCard";
import CommonFilters from "@/Components/CommonFilters";
import { TagFilters, DefaultFilters, UserFilters } from "@/constant/filter";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}) {
  const session = await auth();
  const { page, pageSize, search, filter } = await searchParams;
  const { success, data, message } = await GetUser({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || "",
    filter: filter || "",
  });

  const { user = [] } = data || {};

  return (
    <>
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center justify-between p-5">
          <h1 className="text-3xl font-bold">All Users</h1>
          <CommonFilters
            filter={UserFilters}
            defaultFilters={DefaultFilters.UserFilters}
          />
        </div>
      </div>

      <DataRenderer
        success={success}
        data={user}
        errorMessage={message}
        render={(user) => {
          return (
            <div className="grid grid-cols-4 gap-4">
              {user.map((users) => (
                <UserCard
                  name={users?.name}
                  key={users._id.toString()}
                  image={users?.image}
                  id={users._id.toString()}
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
