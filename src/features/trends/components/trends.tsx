import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { useHashtags } from "@/features/explore";

import styles from "./styles/trends.module.scss";
import Trend from "./trend";

export const Trends = () => {
  const { data: hashtags, isLoading, isError } = useHashtags();

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <div className={styles.error}>
          <TryAgain />
        </div>
      ) : (
        <>
          <h1>Trends</h1>

          <div className={styles.trends}>
            {hashtags.length > 0 &&
              hashtags?.map((hashtag, index) => {
                return (
                  <Trend
                    key={hashtag.id}
                    ranking={index + 1}
                    title={hashtag.text}
                    tweets={hashtag.score}
                  />
                );
              })}
          </div>

          <button className={styles.showMore}>Show more</button>
        </>
      )}
    </div>
  );
};
