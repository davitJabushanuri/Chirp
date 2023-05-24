import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Like(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { tweetId, userId } = req.body;
  if (method === "POST") {
    try {
      const tweet = await prisma.tweet.findUnique({
        where: {
          id: tweetId,
        },
      });
      if (!tweet) {
        res.status(404).json({ error: "Tweet not found" });
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        res.status(404).json({ error: "User not found" });
      }

      const like = await prisma.like.findFirst({
        where: {
          tweet_id: tweetId,
          user_id: userId,
        },
      });

      if (like) {
        await prisma.like.delete({
          where: {
            id: like.id,
          },
        });
        res.status(200).json({ message: "Tweet unliked" });
      } else {
        await prisma.like.create({
          data: {
            tweet: {
              connect: {
                id: tweetId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
        res.status(200).json({ message: "Tweet liked" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
