import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../app/api/auth/[...nextauth]/route";
import type { Session } from "next-auth";

type ISession = Session & {
  user: { _id: string; admin: string };
};

const getSession = async (req: NextRequest, res: NextResponse) => {
  try {
    const session: ISession | null = await getServerSession(
      req as unknown as NextApiRequest,
      {
        ...res,
        getHeader: (name: string) => res.headers?.get(name),
        setHeader: (name: string, value: string) =>
          res.headers?.set(name, value),
      } as unknown as NextApiResponse,
      authOptions
    );

    return Promise.resolve(session);
  } catch (err) {
    return Promise.reject(err);
  }
};

export default getSession;
