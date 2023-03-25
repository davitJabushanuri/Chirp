import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function SearchHashtags(
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
    const hashtags = await prisma.hashtag.findMany({
      where: {
        text: {
          contains: slug as string,
          mode: "insensitive",
        },
      },
    });

    res.status(200).json(hashtags);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
