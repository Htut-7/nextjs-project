import React from "react";
import { auth } from "@/auth";
import Filters from "@/Components/Filters";
import ThreadCard from "@/Components/ThreadCard";
import ButtonLink from "@/Components/ButtonLink";
import ROUTES from "@/ROUTES";
import { GetQuestions } from "@/Components/lib/action/GetQuestions.action";
import DataRenderer from "@/Components/DataRenderer";
import GetTagQuestions from "@/Components/lib/action/GetTagQuestions.action";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    [key: string]: string;
  }>;
}) {
  const { id } = await params;
  const { page, pageSize, search, filter } = await searchParams;
  // const response = await fetchHandler("http://localhost:3000/api/users");
  // console.log(response);
  // const { data } = await api.user.getUsersbyId("6a741b9a9c5bae5e5957ed2b");
  // console.log(data);
  const { success, data, message } = await GetTagQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || "",
    tagId: id,
  });

  const { questions = [], tag } = data || {};

  return (
    <>
      <div className="flex justify-between items-center p-5">
        <div className="text-3xl font-bold">
          <h1>{tag?.name}</h1>
        </div>
      </div>
      <DataRenderer
        success={success}
        data={questions}
        errorMessage={message}
        render={(questions) =>
          questions.map((question) => <ThreadCard question={question} />)
        }
      />
    </>
  );
}

export default page;
