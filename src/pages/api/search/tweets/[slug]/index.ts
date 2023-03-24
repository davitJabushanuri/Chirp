import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function SearchTweets(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { slug } = req.query;
    const tweets = await prisma.tweet.findMany({
      where: {
        text: {
          contains: slug as string,
        },
      },

      include: {
        author: true,
        likes: true,
        retweets: true,
        comments: true,
        media: true,
      },
    });
    res.status(200).json(tweets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
