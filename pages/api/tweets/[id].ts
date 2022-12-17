import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Tweets(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  if (method === "GET") {
    try {
      const tweet = await prisma.tweet.findUnique({
        where: {
          id: Number(req.query.id),
        },
      });
      res.status(200).json(tweet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
