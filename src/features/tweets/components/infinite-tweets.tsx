"use client";
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
  tweets: IInfiniteTweets | undefined;
  isSuccess: boolean | undefined;
  isFetchingNextPage: boolean | undefined;
  fetchNextPage: () => Promise<any> | void;
  hasNextPage: boolean | undefined;
}) => {
  const { ref } = useInView({
    onChange: (inView) => {
      inView && hasNextPage && fetchNextPage();
    },
  });

  return (
    <div className={styles.container}>
      {isSuccess &&
        tweets?.pages?.map((page) => {
          return page?.tweets?.map((tweet, index) =>
            index === page.tweets.length - 1 ? (
              <div ref={ref} className={styles.tweetContainer} key={tweet.id}>
                <Tweet tweet={tweet} />
              </div>
            ) : (
              <div className={styles.tweetContainer} key={tweet.id}>
                <Tweet tweet={tweet} />
              </div>
            ),
          );
        })}

      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};
