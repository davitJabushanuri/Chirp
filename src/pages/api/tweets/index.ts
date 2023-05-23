import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Tweets(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method === "GET") {
    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 10;
    try {
      const tweets = await prisma.tweet.findMany({
        skip: page * limit,
        take: limit,

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

  if (method === "DELETE") {
    try {
      const { tweetId } = req.body;
      const tweet = await prisma.tweet.delete({
        where: {
          id: tweetId,
        },
      });
      res.status(200).json(tweet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
