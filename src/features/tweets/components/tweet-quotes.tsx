import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { useTweet } from "../hooks/use-tweet";

import styles from "./styles/tweet-quotes.module.scss";
import { Tweet } from "./tweet";

export const TweetQuotes = () => {
  const pathname = usePathname();
  const tweetId = pathname?.split(`/`)[2] || ``;

  const {
    data: tweet,
    isLoading,
    isError,
  } = useTweet({
    id: tweetId,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      {tweet?.quotes?.map((quote) => {
        return (
          <div key={quote?.id} className={styles.quote}>
            <Tweet tweet={quote} />
          </div>
        );
      })}
    </div>
  );
};
