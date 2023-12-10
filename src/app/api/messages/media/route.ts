import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const message_id = searchParams.get("message_id") as string;

  const messageSchema = z.string().cuid();
  const zod = messageSchema.safeParse(message_id);

  if (!zod.success) {
    return NextResponse.json({ error: zod.error.formErrors }, { status: 400 });
  }

  try {
    const media = await prisma.message
      .findUnique({
        where: {
          id: message_id,
        },
      })
      .media();

    return NextResponse.json(media, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
