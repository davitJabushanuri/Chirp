import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Messages(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;

  if (method === "POST") {
    const { text, conversationId, senderId, receiverId } = body;
    try {
      await prisma.message.create({
        data: {
          text: text,
          conversation_id: conversationId,
          sender_id: senderId,
          receiver_id: receiverId,
        },
      });
      res.status(200).json({ message: "Message created successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
