import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Retweet(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { hashtags } = req.body;

  if (method === "GET") {
    try {
      const hashtags = await prisma.hashtag.findMany({
        take: 10,
        orderBy: {
          score: "desc",
        },
      });
      res.status(200).json(hashtags);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  if (method === "POST") {
    if (!hashtags)
      return res.status(400).json({ error: "No hashtags provided" });
    try {
      hashtags?.forEach(async (hashtag: string) => {
        const hashtagExists = await prisma.hashtag.findUnique({
          where: {
            hashtag: hashtag.toLowerCase(),
          },
        });

        if (hashtagExists) {
          await prisma.hashtag.update({
            where: {
              hashtag: hashtag.toLowerCase(),
            },
            data: {
              score: {
                increment: 1,
              },
            },
          });
          res.status(200).json({ message: "Hashtag score increased" });
        } else {
          await prisma.hashtag.create({
            data: {
              text: hashtag,
              hashtag: hashtag.toLowerCase(),
            },
          });
          res.status(200).json({ message: "Hashtag created" });
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}