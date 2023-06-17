import { NextRequest, NextResponse } from "next/server";

import Bookmark from "@/models/Bookmark";
import dbConnect from "@/utils/dbConnect";
import getSession from "@/utils/getSession";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getSession(req, res);

  if (!session)
    return new NextResponse(
      JSON.stringify({ error: true, message: "Not Authenticated" }),
      { status: 401 }
    );

  const body = await req.json();

  try {
    await dbConnect();

    let BookmarkFound = await Bookmark.findOne({
      user_id: session.user._id,
      topic_id: body.topic_id,
    });

    if (BookmarkFound) {
      await BookmarkFound.deleteOne();
    } else {
      await new Bookmark({
        user_id: session.user._id,
        topic_id: body.topic_id,
      }).save();
    }

    return new NextResponse(
      JSON.stringify({
        error: false,
        message: "Action Successfully Completed",
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
