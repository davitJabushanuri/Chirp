import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tweet_id = searchParams.get("tweet_id");
  const type = searchParams.get("type");

  try {
    const authors = await prisma.user.findMany({
      where: {
        ...(type === "retweets" && {
          retweets: {
            some: {
              tweet_id: tweet_id as string,
            },
          },
        }),

        ...(type === "likes" && {
          likes: {
            some: {
              tweet_id: tweet_id as string,
            },
          },
        }),
      },
    });

    return Response.json(authors, {
      status: 200,
    });
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      {
        status: 500,
      },
    );
  }
}
