import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Media(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { tweet_id, media_url, media_type } = req.body;

  if (method === "POST") {
    try {
      const media = await prisma.media.create({
        data: {
          tweet_id: tweet_id as string,
          media_url: media_url as string,
          media_type: media_type as string,
        },
      });
      res.status(200).json(media);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
