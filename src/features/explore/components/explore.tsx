import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Trends } from "@/features/trends";
import { Tweet, useTweets } from "@/features/tweets";

import styles from "./styles/explore.module.scss";

export const Explore = () => {
  const { data: tweets, isLoading, isError } = useTweets();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.trends}>
        <Trends title={`Trends for you`} />
      </div>

      <div className={styles?.scores}></div>

      <div className={styles.tweets}>
        {tweets?.map((tweet) => {
          return (
            <div className={styles.tweet} key={tweet?.id}>
              <Tweet tweet={tweet} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
