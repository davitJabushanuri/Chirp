import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id") || undefined;
  const type = searchParams.get("type") || undefined;

  const userIdSchema = z.string().cuid().optional();
  const zod = userIdSchema.safeParse(user_id);

  if (!zod.success) {
    return NextResponse.json(zod.error, { status: 400 });
  }

  try {
    if (type === "followers") {
      const followers = await prisma.user
        .findUnique({
          where: {
            id: user_id,
          },
        })
        .followers({
          include: {
            follower: {
              include: {
                followers: true,
              },
            },
          },
        });
      return NextResponse.json(followers, { status: 200 });
    } else if (type === "following") {
      const following = await prisma.user
        .findUnique({
          where: {
            id: user_id,
          },
        })
        .following({
          include: {
            following: {
              include: {
                followers: true,
              },
            },
          },
        });

      return NextResponse.json(following, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { follower_id, following_id } = await request.json();

  const followerIdSchema = z
    .object({
      follower_id: z.string().cuid(),
      following_id: z.string().cuid(),
    })
    .strict();

  const zod = followerIdSchema.safeParse({ follower_id, following_id });

  if (!zod.success) {
    return NextResponse.json(zod.error, { status: 400 });
  }

  try {
    const isFollowing = await prisma.follows.findUnique({
      where: {
        follower_id_following_id: {
          follower_id,
          following_id,
        },
      },
    });

    if (isFollowing) {
      await prisma.follows.delete({
        where: {
          follower_id_following_id: {
            follower_id,
            following_id,
          },
        },
      });
      return NextResponse.json("Unfollowed", { status: 200 });
    } else {
      await prisma.follows.create({
        data: {
          follower_id,
          following_id,
        },
      });

      return NextResponse.json("Followed", { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
