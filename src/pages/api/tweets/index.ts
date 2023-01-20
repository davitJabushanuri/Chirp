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
          author: {
            include: {
              bookmarks: true,
            },
          },
          likes: true,
          media: true,
          retweets: true,
          quoted_tweet: {
            include: {
              author: true,
              media: true,
            },
          },
          quotes: true,
          comments: true,
          bookmarks: {
            include: {
              user: true,
            },
            orderBy: {
              created_at: "desc",
            },
          },
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
