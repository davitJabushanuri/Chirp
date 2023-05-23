import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Tweets(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method === "GET") {
    const take = Number(req.query.limit) || 10;
    const cursorQuery = (req.query.cursor as string) ?? undefined;
    const skip = cursorQuery ? 1 : 0;
    const cursor = cursorQuery ? { id: cursorQuery } : undefined;
    try {
      const tweets = await prisma.tweet.findMany({
        skip,
        take,
        cursor,

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

      const nextId =
        tweets.length < take ? undefined : tweets[tweets.length - 1].id;

      res.status(200).json({
        tweets,
        nextId,
      });
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
