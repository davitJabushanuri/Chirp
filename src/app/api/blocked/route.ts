import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message: "You have been rate limited, please try again later.",
    },
    {
      status: 429,
    },
  );
}
