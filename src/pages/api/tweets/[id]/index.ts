import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Tweet(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    try {
      const tweet = await prisma.tweet.findUnique({
        where: {
          id: req.query.id as string,
        },
        include: {
          author: true,
          likes: {
            include: {
              user: {
                include: {
                  followers: true,
                },
              },
            },
            orderBy: {
              created_at: "desc",
            },
          },
          media: true,
          retweets: {
            include: {
              user: {
                include: {
                  followers: true,
                },
              },
            },
            orderBy: {
              created_at: "desc",
            },
          },
          quoted_tweet: {
            include: {
              author: true,
              media: true,
            },
          },

          quotes: {
            include: {
              likes: true,
              retweets: true,
              author: true,
              quoted_tweet: {
                include: {
                  author: true,
                },
              },
            },

            orderBy: {
              created_at: "desc",
            },
          },

          comments: {
            include: {
              author: true,
              likes: true,
              media: true,
              retweets: true,
              quoted_tweet: {
                include: {
                  author: true,
                  media: true,
                },
              },
            },

            orderBy: {
              created_at: "desc",
            },
          },
        },
      });
      res.status(200).json(tweet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
