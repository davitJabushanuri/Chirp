import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { useTweets } from "../hooks/use-tweets";

import { InfiniteTweets } from "./infinite-tweets";
import styles from "./styles/comments.module.scss";

export const Comments = ({ tweetId }: { tweetId: string }) => {
  const {
    data: comments,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
  } = useTweets({
    queryKey: ["tweets", tweetId, "comments"],
    type: "comments",
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
      <InfiniteTweets
        tweets={comments}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isSuccess={isSuccess}
      />
    </div>
  );
};
