import { NextRequest, NextResponse } from "next/server";

import Topic from "@/models/Topic";
import dbConnect from "@/utils/dbConnect";
import getSession from "@/utils/getSession";

type IResponse = NextResponse & {
  params: { id: string };
};

export const GET = async (req: NextRequest, { params }: any) => {
  const { id } = params;

  try {
    await dbConnect();
    const data = await Topic.findById(id);
    return new NextResponse(
      JSON.stringify({
        error: false,
        message: "Topic Retrieved Successfully",
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

export const PUT = async (req: NextRequest, res: IResponse) => {
  const session = await getSession(req, res);

  if (!session || !session.user.admin)
    return new NextResponse(
      JSON.stringify({ error: true, message: "Not Authorized" }),
      { status: 403 }
    );

  const { id } = res.params;
  const body = await req.json();

  try {
    await dbConnect();
    const data = await Topic.findByIdAndUpdate(id, { ...body }, { new: true });
    return new NextResponse(
      JSON.stringify({
        error: false,
        message: "Topic Updated Successfully",
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

export const DELETE = async (req: NextRequest, res: IResponse) => {
  const session = await getSession(req, res);

  if (!session || !session.user.admin)
    return new NextResponse(
      JSON.stringify({ error: true, message: "Not Authorized" }),
      { status: 403 }
    );

  const { id } = res.params;

  try {
    await dbConnect();
    await Topic.findByIdAndDelete(id);
    return new NextResponse(
      JSON.stringify({ error: false, message: "Topic Deleted Successfully" }),
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
