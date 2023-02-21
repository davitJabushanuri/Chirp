import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Conversation(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req;
  if (method === "GET") {
    try {
      const tweets = await prisma.conversation.findUnique({
        where: {
          id: query.id as string,
        },
        include: {
          messages: {
            include: {
              receiver: true,
              sender: true,
            },
          },
          users: {
            include: {
              followers: true,
            },
          },
        },
      });
      res.status(200).json(tweets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
