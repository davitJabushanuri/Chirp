import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Conversation(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;

  if (method === "POST") {
    const { senderId, receiverId } = body;
    try {
      const conversation = await prisma.conversation.findFirst({
        where: {
          OR: [
            {
              id: `${senderId}-${receiverId}`,
            },
            {
              id: `${receiverId}-${senderId}`,
            },
          ],
        },
      });

      if (conversation) {
        return res.status(200).json(conversation);
      }

      const message = await prisma.conversation.create({
        data: {
          id: `${senderId}-${receiverId}`,
          users: {
            connect: [
              {
                id: senderId,
              },
              {
                id: receiverId,
              },
            ],
          },
        },
      });
      res.status(200).json(message);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
