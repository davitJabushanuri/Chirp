import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversation_id = searchParams.get("conversation_id") as string;

  const messageSchema = z.string();
  const zod = messageSchema.safeParse(conversation_id);

  if (!zod.success) {
    return NextResponse.json({ error: zod.error.formErrors }, { status: 400 });
  }

  try {
    const chat = await prisma.message.findMany({
      where: {
        conversation_id: conversation_id,
      },
    });

    return NextResponse.json(chat, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
