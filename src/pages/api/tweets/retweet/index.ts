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
      const retweet = await prisma.retweet.findFirst({
        where: {
          tweet_id: tweetId,
          user_id: userId,
        },
      });

      if (retweet) {
        await prisma.retweet.delete({
          where: {
            id: retweet.id,
          },
        });
        res.status(200).json({ message: "Tweet unretweeted" });
      } else {
        await prisma.retweet.create({
          data: {
            tweet_id: tweetId,
            user_id: userId,
          },
        });
        res.status(200).json({ message: "Tweet retweeted" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
