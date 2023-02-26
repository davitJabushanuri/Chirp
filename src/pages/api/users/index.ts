import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "next-auth/next";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Users(req: NextApiRequest, res: NextApiResponse) {
  // const session = await getServerSession(req, res, authOptions);
  // console.log(session);

  // if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { method } = req;
  if (method === "GET") {
    try {
      const users = await prisma.user.findMany({
        include: {
          followers: {
            include: {
              follower: true,
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
