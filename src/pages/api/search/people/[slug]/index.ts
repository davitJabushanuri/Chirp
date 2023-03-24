import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function SearchPeople(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { slug } = req.query;
    const people = await prisma.user.findMany({
      where: {
        OR: [
          {
            screen_name: {
              contains: slug as string,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: slug as string,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    res.status(200).json(people);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
