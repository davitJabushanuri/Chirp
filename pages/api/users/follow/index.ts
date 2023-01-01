import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Follow(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { followerId, userId } = req.body;

  if (method === "POST") {
    try {
      const isFollowing = await prisma.follows.findUnique({
        where: {
          follower_id_following_id: {
            follower_id: followerId,
            following_id: userId,
          },
        },
      });

      if (isFollowing) {
        await prisma.follows.delete({
          where: {
            follower_id_following_id: {
              follower_id: followerId,
              following_id: userId,
            },
          },
        });
        res.status(200).json("Unfollowed");
      } else {
        await prisma.follows.create({
          data: {
            follower: {
              connect: {
                id: followerId,
              },
            },
            following: {
              connect: {
                id: userId,
              },
            },
          },
        });

        res.status(200).json("Followed");
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
