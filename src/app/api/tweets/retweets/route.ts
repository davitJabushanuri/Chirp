import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { tweet_id, user_id } = (await request.json()) as {
    tweet_id: string;
    user_id: string;
  };

  const retweetSchema = z
    .object({
      tweet_id: z.string().cuid(),
      user_id: z.string().cuid(),
    })
    .strict();

  const zod = retweetSchema.safeParse({ tweet_id, user_id });

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
    const retweet = await prisma.retweet.findFirst({
      where: {
        tweet_id,
        user_id,
      },
    });

    if (retweet) {
      await prisma.retweet.delete({
        where: {
          id: retweet.id,
        },
      });
      return NextResponse.json({ message: "Tweet un retweeted" });
    } else {
      await prisma.retweet.create({
        data: {
          tweet_id,
          user_id,
        },
      });
      return NextResponse.json({ message: "Tweet retweeted" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
