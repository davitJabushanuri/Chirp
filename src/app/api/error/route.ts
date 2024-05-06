import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { name, message, error_stack, component_stack } =
    (await request.json()) as {
      name: string;
      message: string;
      error_stack: string;
      component_stack: string;
    };

  const errorSchema = z
    .object({
      name: z.string(),
      message: z.string(),
      error_stack: z.string(),
      component_stack: z.string(),
    })
    .strict();

  const zod = errorSchema.safeParse({
    name,
    message,
    error_stack,
    component_stack,
  });

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
    await prisma?.errorLog.create({
      data: {
        name,
        message,
        error_stack,
        component_stack,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error submitting error",
      },
      { status: 500 },
    );
  }
}
