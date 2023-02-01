import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function UserTweetsWithReplies(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  if (method === "GET") {
    try {
      const users = await prisma.user
        .findUnique({
          where: {
            id: req.query.id as string,
          },
        })
        .tweets({
          where: {
            NOT: {
              in_reply_to_status_id: null,
              in_reply_to_screen_name: null,
            },
          },
          include: {
            author: true,
            media: true,
            likes: true,
            retweets: true,
            comments: true,
          },

          orderBy: {
            created_at: "desc",
          },
        });
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
