import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Conversation(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;

  if (method === "DELETE") {
    const { conversationId } = body;

    try {
      const conversation = await prisma.conversation.delete({
        where: {
          id: conversationId,
        },
      });
      res.status(200).json(conversation);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
