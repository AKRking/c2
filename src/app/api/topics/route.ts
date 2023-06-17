import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import Topic from "@/models/Topic";
import dbConnect from "@/utils/dbConnect";
import getSession from "@/utils/getSession";

type IResponse = NextResponse & {
  query: { page: number; size: number };
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getSession(req, res);

  if (!session || !session.user.admin)
    return new NextResponse(
      JSON.stringify({ error: true, message: "Not Authorized" }),
      { status: 403 }
    );

  const body = await req.json();

  try {
    await dbConnect();
    await new Topic({ ...body }).save();
    return new NextResponse(
      JSON.stringify({ error: false, message: "Topic Created Successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ error: true, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest, res: IResponse) => {
  const session = await getSession(req, res);
  const page = res.query?.page || 1;
  const pageSize = res.query?.size || 12;
  const skip = (page - 1) * pageSize;

  try {
    await dbConnect();

    let pipeline_1: any = [{ $skip: skip }, { $limit: pageSize }];
    let pipeline_2 = [
      {
        $lookup: {
          from: "likes",
          let: { topic_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$topic_id", "$$topic_id"] },
                    {
                      $eq: [
                        "$user_id",
                        new mongoose.Types.ObjectId(session?.user._id),
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "likes",
        },
      },
      {
        $addFields: {
          isLiked: {
            $cond: {
              if: { $gt: [{ $size: "$likes" }, 0] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $lookup: {
          from: "bookmarks",
          let: { topic_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$topic_id", "$$topic_id"] },
                    {
                      $eq: [
                        "$user_id",
                        new mongoose.Types.ObjectId(session?.user._id),
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "bookmarks",
        },
      },
      {
        $addFields: {
          isBookmarked: {
            $cond: {
              if: { $gt: [{ $size: "$bookmarks" }, 0] },
              then: true,
              else: false,
            },
          },
        },
      },
    ];

    if (session) pipeline_1 = [...pipeline_1, ...pipeline_2];

    const data = await Topic.aggregate([
      {
        $facet: {
          topics: [
            ...pipeline_1,
            {
              $project: {
                _id: 1,
                title: 1,
                mini_description: 1,
                isLiked: {
                  $cond: {
                    if: "$isLiked",
                    then: "$isLiked",
                    else: false,
                  },
                },
                isBookmarked: {
                  $cond: {
                    if: "$isBookmarked",
                    then: "$isBookmarked",
                    else: false,
                  },
                },
              },
            },
          ],
          total_topics: [{ $match: {} }, { $count: "totalCount" }],
        },
      },
    ]);
    return new NextResponse(
      JSON.stringify({
        error: false,
        message: "Topics Retrieved Successfully",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ error: true, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
