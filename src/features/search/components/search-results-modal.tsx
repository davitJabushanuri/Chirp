import Link from "next/link";

import { SearchIcon } from "@/assets/search-icon";
import { Avatar } from "@/components/designs/avatar";
import { Progressbar } from "@/components/designs/progressbar";
import { TryAgain } from "@/components/elements/try-again";
import { UserName, UserScreenName } from "@/features/profile";

import { useQueryPeople } from "../hooks/use-query-people";
import { useSearchStore } from "../stores/use-search";

import styles from "./styles/search-results-modal.module.scss";

export const SearchResultsModal = ({ query }: { query: string }) => {
  const closeResultsModal = useSearchStore((state) => state.closeResultsModal);

  const { data: people, isFetching, isError } = useQueryPeople(query);

  if (isError) return <TryAgain />;

  return (
    <div className={styles.container}>
      <div className={styles.progressbar}>{isFetching && <Progressbar />}</div>
      {!people ? (
        <div className={styles.placeholder}>
          Try searching for people, topics, or keywords
        </div>
      ) : (
        <div>
          <div className={styles.card}>
            <span className={styles.icon}>
              <SearchIcon />
            </span>
            <span className={styles.text}>{query}</span>
          </div>

          <div className={styles.people}>
            {people?.map((person) => {
              return (
                <div key={person?.id}>
                  <Avatar
                    userImage={person?.profile_image_url}
                    width={53}
                    height={53}
                  />
                  <UserName
                    isVerified={person?.verified}
                    name={person?.name}
                    userId={person?.id}
                  />
                  <UserScreenName
                    screenName={person?.email?.split("@")[0]}
                    userId={person?.id}
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.link}>
            <Link href={`/${query}`}>Go to @{query}</Link>
          </div>
        </div>
      )}
    </div>
  );
};
