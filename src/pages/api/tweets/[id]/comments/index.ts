import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Comments(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  if (method === "GET") {
    try {
      const tweets = await prisma.tweet.findMany({
        where: {
          in_reply_to_status_id: req.query.id as string,
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
      res.status(200).json(tweets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
