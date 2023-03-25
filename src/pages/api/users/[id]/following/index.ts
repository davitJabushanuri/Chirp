import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Following(
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
        .following({
          select: {
            follower: {
              include: {
                followers: true,
              },
            },
          },
        });

      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}