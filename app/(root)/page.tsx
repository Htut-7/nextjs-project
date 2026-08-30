import React from "react";
import { auth } from "@/auth";
import Filters from "@/Components/Filters";
import ThreadCard from "@/Components/ThreadCard";
import ButtonLink from "@/Components/ButtonLink";
import ROUTES from "@/ROUTES";
import { GetQuestions } from "@/Components/lib/action/GetQuestions.action";

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}) {
  const session = await auth();
  const { page, pageSize, search, filter } = await searchParams;
  // const response = await fetchHandler("http://localhost:3000/api/users");
  // console.log(response);
  // const { data } = await api.user.getUsersbyId("6a741b9a9c5bae5e5957ed2b");
  // console.log(data);
  const { success, data, message } = await GetQuestions({
    page: Number(page) || 1,
    pageSize: Number(page) || 10,
    search: search || "",
    filter: filter || "",
  });

  const { questions } = data || {};

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
      {success && data ? (
        questions && questions.length > 0 ? (
          questions.map((question, i) => (
            <ThreadCard question={question} key={i} />
          ))
        ) : (
          <p>No Results Found</p>
        )
      ) : (
        <p>{message}</p>
      )}
    </>
  );
}

export default page;
