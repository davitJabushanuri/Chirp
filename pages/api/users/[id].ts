import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(req.query.id),
        },
      });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
