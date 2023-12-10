import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { media } = await request.json();

  const mediaSchema = z
    .object({
      tweet_id: z.string().nullable().optional(),
      message_id: z.string().nullable().optional(),
      media_url: z.string(),
      media_type: z.string(),
      media_path: z.string(),
    })
    .strict();

  const zod = mediaSchema.safeParse(media);

  if (!zod.success) {
    return NextResponse.json({ error: zod.error }, { status: 400 });
  }

  try {
    await prisma.media.create({
      data: {
        ...media,
      },
    });
    return NextResponse.json(
      { message: "Media created successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
