import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { tweet_id, user_id } = await request.json();

  const likeSchema = z
    .object({
      tweet_id: z.string().cuid(),
      user_id: z.string().cuid(),
    })
    .strict();

  const zod = likeSchema.safeParse({ tweet_id, user_id });

  if (!zod.success) {
    return NextResponse.json(
      {
        message: "Invalid request body",
        error: zod.error.formErrors,
      },
      { status: 400 },
    );
  }

  try {
    const like = await prisma.like.findFirst({
      where: {
        tweet_id,
        user_id,
      },
    });

    if (like) {
      await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
      return NextResponse.json({ message: "Tweet unliked" });
    } else {
      await prisma.like.create({
        data: {
          tweet: {
            connect: {
              id: tweet_id,
            },
          },
          user: {
            connect: {
              id: user_id,
            },
          },
        },
      });
      return NextResponse.json({ message: "Tweet liked" });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
