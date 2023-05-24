import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Comments(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  if (method === "GET") {
    try {
      const tweets = await prisma.tweet
        .findUnique({
          where: {
            id: req.query.id as string,
          },
        })
        .comments({
          include: {
            author: true,
            likes: true,
            media: true,
            retweets: true,
            comments: true,
            quoted_tweet: {
              include: {
                author: true,
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
