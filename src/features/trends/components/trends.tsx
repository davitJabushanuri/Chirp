import Link from "next/link";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { useHashtags } from "@/features/explore";

import styles from "./styles/trends.module.scss";
import { Trend } from "./trend";

export const Trends = ({ title = "Trends" }: { title?: string }) => {
  const { data: hashtags, isLoading, isError, isSuccess } = useHashtags();

  if (hashtags && hashtags?.length <= 0) return null;

  return (
    <section aria-label="Timeline: Trending now" className={styles.container}>
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
          <div className={styles.trends}>
            <h2>{title}</h2>
            {isSuccess &&
              hashtags?.length > 0 &&
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
          <Link href={`trends`} className={styles.showMore}>
            Show more
          </Link>
        </>
      )}
    </section>
  );
};
