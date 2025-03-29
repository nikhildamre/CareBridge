import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "No active session found." });
  }

  return res.status(200).json({ message: "Session is active.", session });
}
