/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { SearchIcon } from "@/assets/search-icon";
import { Avatar } from "@/components/designs/avatar";
import { Progressbar } from "@/components/designs/progressbar";
import { TryAgain } from "@/components/elements/try-again";
import { UserName, UserScreenName } from "@/features/profile";

import { useSearch } from "../hooks/use-search";
import { useSearchStore } from "../stores/use-search";

import styles from "./styles/search-results-modal.module.scss";

export const SearchResultsModal = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) => {
  const router = useRouter();
  const closeResultsModal = useSearchStore((state) => state.closeResultsModal);

  const { data, isFetching, isError, refetch, isRefetching } = useSearch(query);

  useEffect(() => {
    if (isRefetching) return;

    if (query) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (isError) return <TryAgain />;

  return (
    <div className={styles.container}>
      <div className={styles.progressbar}>{isFetching && <Progressbar />}</div>
      {!query ? (
        <div className={styles.placeholder}>
          Try searching for people, topics, or keywords
        </div>
      ) : (
        <div className={styles.results}>
          <button
            onClick={() => {
              router.push(`/search?query=${query}`);
              closeResultsModal();
            }}
            className={styles.link}
          >
            Search for &quot;{query}&quot;
          </button>

          {data?.hashtags && (
            <div className={styles.hashtags}>
              {data?.hashtags?.map((hashtag) => {
                return (
                  <button
                    onClick={() => {
                      router.push(`/search?query=${hashtag?.text}`);
                      closeResultsModal();
                    }}
                    className={styles.hashtag}
                    key={hashtag?.id}
                  >
                    <span className={styles.icon}>
                      <SearchIcon />
                    </span>
                    <span className={styles.text}>{hashtag?.text}</span>
                  </button>
                );
              })}
            </div>
          )}

          {data?.people && data?.people?.length > 0 && (
            <div className={styles.people}>
              {data?.people?.map((person) => {
                return (
                  <div
                    onClick={() => {
                      router.push(`/${person?.id}`);
                      closeResultsModal();
                      setQuery("");
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
                  </div>
                );
              })}
            </div>
          )}

          <button
            onClick={() => {
              router.push(`/${query}`);
              closeResultsModal();
              setQuery("");
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
