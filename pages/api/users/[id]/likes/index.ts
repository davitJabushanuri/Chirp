import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function UserLikes(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  if (method === "GET") {
    try {
      const tweetsByUser = await prisma.likes.findMany({
        where: {
          user_id: req.query.id as string,
        },
        include: {
          tweet: {
            include: {
              author: true,
              likes: true,
              media: true,
            },
          },
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
