import { Metadata } from "next";

import { TweetHeader } from "@/features/header";
import { TweetDetails, getTweetMetadata } from "@/features/tweets";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> {
  const tweet = await getTweetMetadata({
    tweet_id: params.id,
  });

  if (!tweet)
    return {
      title: "Tweet",
    };

  return {
    title: `${tweet?.author?.name} on Chirp: "${decodeURIComponent(
      tweet?.text as string,
    )}"`,
    description: decodeURIComponent(tweet?.text as string),
  };
}

const TweetPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const initialTweet = await getTweetMetadata({
    tweet_id: params.id,
  });

  return (
    <div>
      <TweetHeader />
      <TweetDetails initialTweet={initialTweet as any} />
    </div>
  );
};

export default TweetPage;
