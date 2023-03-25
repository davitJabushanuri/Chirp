"use client";
import { useRouter } from "next/navigation";

import { SearchIcon } from "@/assets/search-icon";
import { Avatar } from "@/components/designs/avatar";
import { Progressbar } from "@/components/designs/progressbar";
import { TryAgain } from "@/components/elements/try-again";
import { UserName, UserScreenName } from "@/features/profile";

import { useQueryPeople } from "../hooks/use-query-people";
import { useSearchStore } from "../stores/use-search";

import styles from "./styles/search-results-modal.module.scss";

export const SearchResultsModal = ({ query }: { query: string }) => {
  const router = useRouter();
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
        <div className={styles.results}>
          <button
            onClick={() => {
              closeResultsModal();
              router.push(`/search/${query}`);
            }}
            className={styles.hashtag}
          >
            <span className={styles.icon}>
              <SearchIcon />
            </span>
            <span className={styles.text}>{query}</span>
          </button>

          <div className={styles.people}>
            {people?.map((person) => {
              return (
                <button
                  onClick={() => {
                    closeResultsModal();
                    router.push(`/${person?.id}`);
                  }}
                  className={styles.person}
                  key={person?.id}
                >
                  <Avatar
                    userImage={person?.profile_image_url}
                    width={53}
                    height={53}
                  />
                  <span className={styles.info}>
                    <UserName
                      isVerified={person?.verified}
                      name={person?.name}
                      userId={person?.id}
                    />
                    <UserScreenName
                      screenName={person?.email?.split("@")[0]}
                      userId={person?.id}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              closeResultsModal();
              router.push(`/${query}`);
            }}
            className={styles.link}
          >
            Go to @{query}
          </button>
        </div>
      )}
    </div>
  );
};
