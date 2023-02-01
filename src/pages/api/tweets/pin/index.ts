import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function PinTweet(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { tweetId, userId } = req.body;

  if (method === "PUT") {
    try {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },

        data: {
          pinned_tweet_id: tweetId,
        },
      });

      res.status(200).json({ message: "Tweet pinned", user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  if (method === "DELETE") {
    try {
      const user = await prisma.user.update({
        where: {
          id: req.body.id,
        },

        data: {
          pinned_tweet_id: null,
        },
      });

      res.status(200).json({ message: "Tweet unpinned", user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
