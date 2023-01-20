import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Bookmark(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { tweetId, userId } = req.body;

  if (method === "POST") {
    try {
      await prisma.bookmark.create({
        data: {
          tweet_id: tweetId,
          user_id: userId,
        },
      });
      res.status(200).json({
        message: "Bookmark added",
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  if (method === "DELETE") {
    try {
      await prisma.bookmark.delete({
        where: {
          tweet_id_user_id: {
            tweet_id: tweetId,
            user_id: userId,
          },
        },
      });
      res.status(200).json({
        message: "Bookmark removed",
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  return res.status(200).json({ message: "Hello" });
}
