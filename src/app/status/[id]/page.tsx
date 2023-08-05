import { Metadata } from "next";

import { NotFound } from "@/components/elements/not-found";
import { TweetHeader } from "@/features/header";
import { TweetDetails, getTweetMetadata } from "@/features/tweets";
import { TryAgain } from "@/components/elements/try-again";

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
  const tweet = await getTweetMetadata({
    tweet_id: params.id,
  });

  if (!tweet) {
    return <TryAgain />;
  }

  return (
    <>
      <TweetHeader />
      <TweetDetails tweet={tweet as any} />
    </>
  );
};

export default TweetPage;
