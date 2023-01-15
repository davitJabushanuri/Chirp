import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function CreateTweet(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const {
    text,
    userId,
    in_reply_to_screen_name,
    in_reply_to_status_id,
    quoted_tweet_id,
  } = req.body;

  console.log(quoted_tweet_id);

  if (method === "POST") {
    try {
      const tweet = await prisma.tweet.create({
        data: {
          text,
          userId,
          in_reply_to_screen_name: in_reply_to_screen_name
            ? in_reply_to_screen_name
            : null,
          in_reply_to_status_id: in_reply_to_status_id
            ? in_reply_to_status_id
            : null,
          quoted_tweet_id: quoted_tweet_id ? quoted_tweet_id : null,
        },
      });

      res.status(200).json(tweet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
