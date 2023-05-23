import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { LoadingSpinner } from "@/components/elements/loading-spinner";

import { IInfiniteTweets } from "../types";

import styles from "./styles/infinite-tweets.module.scss";
import { Tweet } from "./tweet";

export const InfiniteTweets = ({
  tweets,
  isSuccess,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: {
  tweets: IInfiniteTweets;
  isSuccess: boolean | undefined;
  isFetchingNextPage: boolean | undefined;
  fetchNextPage: () => Promise<any> | void;
  hasNextPage: boolean | undefined;
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className={styles.container}>
      {isSuccess &&
        tweets?.pages?.map((page) => {
          return page?.tweets?.map((tweet, index) => (
            <div
              ref={index === page.tweets.length - 4 ? ref : undefined}
              className={styles.tweetContainer}
              key={tweet.id}
            >
              <Tweet tweet={tweet} />
            </div>
          ));
        })}

      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};
