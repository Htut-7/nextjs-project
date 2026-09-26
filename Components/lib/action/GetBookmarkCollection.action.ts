import Collection, { Icollection } from "@/database/collection.model";
import dbConnect from "../dbconnect";
import { auth } from "@/auth";
import User from "@/database/user.model";
import validatebody from "../validateBodyTemp";
import PaginatedSearchParamsSchema from "../schema/PaginatedSearchParamsSchema";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";
import { actionError } from "../response";

export async function GetBookmarkCollection(params: {
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  filter?: string;
}): Promise<{
  success: boolean;
  data?: {
    collection: Icollection[];
    isNext: boolean;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const authSession = await auth();

  if (!authSession?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await User.findOne({
    email: authSession.user.email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user._id;

  const validatedData = validatebody(params, PaginatedSearchParamsSchema);
  const { page = 1, pageSize = 10, search, sort, filter } = validatedData;

  const skip = (Number(page) - 1) * 10;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Collection> = { author: userId };

  if (search) {
    const matchingQuestions = await Question.find({
      $or: [
        { title: { $regex: new RegExp(search, "i") } },
        { contnet: { $regex: new RegExp(search, "i") } },
      ],
    }).select("_id");
    const matchingIds = matchingQuestions.map((q) => q._id);

    if (!matchingIds.length) {
      return {
        success: true,
        data: {
          collection: [],
          isNext: false,
        },
      };
    }
    filterQuery.question = { $in: matchingIds };
  }

  let sortCriteria = {};

  switch (filter) {
    case "mostrecent":
      sortCriteria = { createdAt: -1 };
      break;

    case "oldest":
      sortCriteria = { createdAt: -1 };
      break;

    case "popular":
      sortCriteria = { upvotes: -1 };
      break;

    case "mostanswer":
      sortCriteria = { answers: -1 };
      break;

    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalCollection = await Collection.countDocuments(filterQuery);
    const collections = await Collection.find(filterQuery)
      .populate({
        path: "question",
        populate: [
          { path: "tags", select: "_id name" },
          { path: "author", select: "_id name image" },
        ],
      })
      .skip(skip)
      .limit(limit)
      .sort(sortCriteria);

    const isNext = totalCollection > skip + collections.length;

    return {
      success: true,
      data: {
        collection: JSON.parse(JSON.stringify(collections)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
