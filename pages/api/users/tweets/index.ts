import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    try {
      const tweetsByUser = await prisma.user
        .findUnique({
          where: {
            screen_name: req.query.id as string,
          },
        })
        .tweets();
      res.status(200).json(tweetsByUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
