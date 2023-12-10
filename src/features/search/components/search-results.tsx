"use client";
import { useSearchParams } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { PersonDetails } from "@/features/connect";
import { InfiniteTweets, useTweets } from "@/features/tweets";

import { useSearchPeople } from "../hooks/use-search-people";

import { NoResults } from "./no-results";
import styles from "./styles/search-results.module.scss";

export const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = decodeURIComponent(searchParams?.get("query") || "");

  const tweets = useTweets({
    queryKey: ["tweets", "query: ", query],
    type: "search",
    id: query,
  });

  const people = useSearchPeople(query);

  if (tweets.isPending || tweets.isFetching) return <LoadingSpinner />;

  if (tweets.isError) return <TryAgain />;

  return (
    <div className={styles.container}>
      {tweets?.data?.pages &&
      tweets?.data?.pages[0]?.tweets?.length === 0 &&
      people?.data?.length === 0 ? (
        <NoResults query={query} />
      ) : (
        <div className={styles.results}>
          {people?.isSuccess && people?.data?.length > 0 && (
            <div className={styles.people}>
              <h1>People</h1>
              {people?.data?.map((person) => {
                return <PersonDetails key={person?.id} author={person} />;
              })}
              <button className={styles.viewAll}>View All</button>
            </div>
          )}

          <div className={styles.tweets}>
            <InfiniteTweets
              tweets={tweets?.data}
              hasNextPage={tweets?.hasNextPage}
              fetchNextPage={tweets?.fetchNextPage}
              isSuccess={tweets?.isSuccess}
              isFetchingNextPage={tweets?.isFetchingNextPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};
