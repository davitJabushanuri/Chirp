import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Messages(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;

  if (method === "POST") {
    const { conversationId, message } = body;
    try {
      const Message = await prisma.message.create({
        data: {
          text: message.text,
          image: message.image,
          conversation_id: conversationId,
          sender_id: message.sender_id,
          receiver_id: message.receiver_id,
        },
      });
      res
        .status(200)
        .json({ Message, message: "Message created successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
