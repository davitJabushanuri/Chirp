import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Messages(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  if (method === "GET") {
    try {
      const media = await prisma.message
        .findUnique({
          where: {
            id: req.query.messageId as string,
          },
        })
        .media();
      res.status(200).json(media);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
