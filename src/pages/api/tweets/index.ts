import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Tweets(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  if (method === "GET") {
    try {
      const tweets = await prisma.tweet.findMany({
        include: {
          author: true,
          likes: true,
          media: true,
          retweets: true,
          quoted_tweet: {
            include: {
              author: true,
              media: true,
            },
          },
          comments: true,
        },

        orderBy: {
          created_at: "desc",
        },
      });
      res.status(200).json(tweets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
