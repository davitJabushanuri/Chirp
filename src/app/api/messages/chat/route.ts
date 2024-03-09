import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversation_id = searchParams.get("conversation_id") as string;
  const cursorQuery = searchParams.get("cursor") || undefined;
  const take = Number(searchParams.get("limit")) || 20;

  const skip = cursorQuery ? 1 : 0;
  const cursor = cursorQuery ? { id: cursorQuery } : undefined;

  const messageSchema = z.string();
  const zod = messageSchema.safeParse(conversation_id);

  if (!zod.success) {
    return NextResponse.json({ error: zod.error.formErrors }, { status: 400 });
  }

  try {
    const chat = await prisma.message.findMany({
      skip,
      take,
      cursor,
      where: {
        conversation_id: conversation_id,
      },
    });

    const nextId = chat.length < take ? undefined : chat[chat.length - 1].id;

    return NextResponse.json({
      chat,
      nextId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
