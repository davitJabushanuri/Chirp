import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function PinTweet(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { tweetId, userId } = req.body;

  if (method === "POST") {
    try {
      const pinnedTweet = await prisma.pinnedTweet.findFirst({
        where: {
          tweet_id: tweetId,
          user_id: userId,
        },
      });

      if (pinnedTweet) {
        await prisma.pinnedTweet.update({
          where: {
            id: pinnedTweet.id,
          },
          data: {
            tweet_id: tweetId,
            user_id: userId,
          },
        });
        res.status(200).json({ message: "Tweet pinned" });
      } else {
        await prisma.pinnedTweet.create({
          data: {
            tweet_id: tweetId,
            user_id: userId,
          },
        });
        res.status(200).json({ message: "Tweet pinned" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  if (method === "DELETE") {
    try {
      const { id } = req.body;
      const pinnedTweet = await prisma.pinnedTweet.delete({
        where: {
          id,
        },
      });
      res.status(200).json(pinnedTweet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
