import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { PersonDetails } from "@/features/connect";
import { Tweet } from "@/features/tweets";

import { useSearchPeople } from "../hooks/use-search-people";
import { useSearchTweets } from "../hooks/use-search-tweets";

import { NoResults } from "./no-results";
import styles from "./styles/search-results.module.scss";

export const SearchResults = () => {
  const pathname = usePathname();
  const query = decodeURIComponent(pathname?.split("/")[2] || "");

  const tweets = useSearchTweets(query);

  const people = useSearchPeople(query);

  if (
    tweets.isLoading ||
    tweets.isFetching ||
    people.isLoading ||
    people.isFetching
  )
    return <LoadingSpinner />;

  if (tweets.isError || people.isError) return <TryAgain />;

  return (
    <div className={styles.container}>
      {tweets?.data?.length === 0 && people?.data?.length === 0 ? (
        <NoResults query={query} />
      ) : (
        <div className={styles.results}>
          {people?.isSuccess && people?.data?.length > 0 && (
            <div className={styles.people}>
              <h1>People</h1>
              {people?.data?.map((person) => {
                return <PersonDetails key={person?.id} author={person} />;
              })}
            </div>
          )}

          {tweets?.isSuccess && tweets?.data?.length > 0 && (
            <div className={styles.tweets}>
              {tweets?.data?.map((tweet) => {
                return (
                  <div key={tweet?.id} className={styles.tweetContainer}>
                    <Tweet tweet={tweet} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
