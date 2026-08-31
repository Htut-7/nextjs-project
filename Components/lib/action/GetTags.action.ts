"use server";

import dbConnect from "../dbconnect";
import validatebody from "../validateBodyTemp";
import PaginatedSearchParamsSchema from "../schema/PaginatedSearchParamsSchema";
import { actionError } from "../response";
import { FilterQuery } from "mongoose";
import Tags, { ItagDoc } from "@/database/tags.model";

export async function GetTags(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}): Promise<{
  data?: {
    tags: ItagDoc[];
    isNext: Boolean;
  };
  success: Boolean;
  message?: string;
  detail?: object | null;
}> {
  await dbConnect();
  const validatedData = validatebody(params, PaginatedSearchParamsSchema);
  const { page = 1, pageSize = 10, search, filter, sort } = validatedData;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Tags> = {};

  if (filter === "recommended") {
    return { success: true, data: { tags: [], isNext: false } };
  }

  if (search) {
    filterQuery.$or = [{ name: { $regex: new RegExp(search, "i") } }];
  }

  let sortingCriteria = {};

  switch (filter) {
    case "popular":
      sortingCriteria = { questions: -1 };
      break;

    case "recent":
      sortingCriteria = { createdAt: -1 };
      break;

    case "oldest":
      sortingCriteria = { createdAt: 1 };
      break;

    case "name":
      sortingCriteria = { name: 1 };
      break;

    default:
      sortingCriteria = { questions: -1 };
  }

  try {
    const totalTags = await Tags.countDocuments(filterQuery);
    const tags = await Tags.find(filterQuery)
      .lean()
      .sort(sortingCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalTags > skip + tags.length;

    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
