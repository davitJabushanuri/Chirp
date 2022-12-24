import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function CreateTweet(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { text, userId } = req.body;
  if (method === "POST") {
    try {
      const tweet = await prisma.tweet.create({
        data: {
          text,
          userId,
        },
      });

      res.status(200).json(tweet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
