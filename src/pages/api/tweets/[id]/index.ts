import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Tweet(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    try {
      const tweet = await prisma.tweet.findUnique({
        where: {
          id: req.query.id as string,
        },
        include: {
          author: true,
          likes: {
            orderBy: {
              created_at: "desc",
            },
          },
          media: true,
          retweets: {
            orderBy: {
              created_at: "desc",
            },
          },
          quoted_tweets: {
            orderBy: {
              created_at: "desc",
            },
          },
        },
      });
      res.status(200).json(tweet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
