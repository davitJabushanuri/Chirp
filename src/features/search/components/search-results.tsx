import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { PersonDetails } from "@/features/connect";
import { Tweet } from "@/features/tweets";

import { useQueryPeople } from "../hooks/use-query-people";
import { useQueryTweets } from "../hooks/use-query-tweets";

import styles from "./styles/search-results.module.scss";

export const SearchResults = () => {
  const pathname = usePathname();
  const query = pathname?.split("/")[2];

  const tweets = useQueryTweets(query);

  const people = useQueryPeople(query);

  if (
    tweets.isLoading ||
    tweets.isFetching ||
    people.isLoading ||
    people.isFetching
  )
    return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <div className={styles.people}>
        <h1>People</h1>
        {people?.isSuccess &&
          people?.data?.length > 0 &&
          people?.data?.map((person) => {
            return <PersonDetails key={person?.id} author={person} />;
          })}
      </div>
      <div className={styles.tweets}>
        {tweets?.isSuccess &&
          tweets?.data?.length > 0 &&
          tweets?.data?.map((tweet) => {
            return (
              <div key={tweet?.id} className={styles.tweetContainer}>
                <Tweet tweet={tweet} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
