import User, { Iuserdoc } from "@/database/user.model";
import dbConnect from "../dbconnect";
import validatebody from "../validateBodyTemp";
import PaginatedSearchParamsSchema from "../schema/PaginatedSearchParamsSchema";
import { FilterQuery } from "mongoose";
import { actionError } from "../response";

export async function GetUser(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  filter?: string;
}): Promise<{
  success: boolean;
  data?: {
    user: Iuserdoc[];
    isNext: boolean;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const validatedData = validatebody(params, PaginatedSearchParamsSchema);
  const { page = 1, pageSize = 10, search, sort, filter } = validatedData;

  const skip = (Number(page) - 1) * 10;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof User> = {};

  if (search) {
    filterQuery.$or = [
      { name: { $regex: new RegExp(search, "i") } },
      { email: { $regex: new RegExp(search, "i") } },
    ];
  }

  let sortingCriteria = {};

  switch (filter) {
    case "oldest": {
      sortingCriteria = { createdAt: 1 };
      break;
    }
    case "newest": {
      sortingCriteria = { createdAt: -1 };
      break;
    }
    case "popular": {
      sortingCriteria = { reputation: -1 };
      break;
    }
    default: {
      sortingCriteria = { createdAt: -1 };
      break;
    }
  }

  try {
    const totalUser = await User.countDocuments(filterQuery);
    const user = await User.find(filterQuery)
      .skip(skip)
      .limit(limit)
      .sort(sortingCriteria);

    const isNext = totalUser > skip + user.length;

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(user)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
