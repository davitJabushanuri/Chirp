import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Tweets(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  if (method === "GET") {
    try {
      const tweets = await prisma.tweet.findMany();
      res.status(200).json(tweets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
