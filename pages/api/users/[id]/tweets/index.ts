import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function UserTweets(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  if (method === "GET") {
    try {
      const tweetsByUser = await prisma.tweet.findMany({
        where: {
          userId: req.query.id as string,
        },

        include: {
          author: true,
          likes: true,
          media: true,
        },

        orderBy: {
          created_at: "desc",
        },
      });

      res.status(200).json(tweetsByUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
