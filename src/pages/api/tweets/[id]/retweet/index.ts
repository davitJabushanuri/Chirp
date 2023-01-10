import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Retweet(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { tweetId, userId } = req.body;
  if (method === "POST") {
    try {
      const retweet = await prisma.retweet.create({
        data: {
          tweet_id: tweetId,
          user_id: userId,
        },
      });

      res.status(200).json(retweet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
