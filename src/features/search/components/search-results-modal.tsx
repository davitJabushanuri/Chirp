/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from "next/navigation";

import { SearchIcon } from "@/assets/search-icon";
import { Avatar } from "@/components/designs/avatar";
import { Progressbar } from "@/components/designs/progressbar";
import { TryAgain } from "@/components/elements/try-again";
import { UserName, UserScreenName } from "@/features/profile";

import { useSearchHashtags } from "../hooks/use-search-hashtags";
import { useSearchPeople } from "../hooks/use-search-people";
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

  const { data: people, isFetching, isError } = useSearchPeople(query);
  const hashtags = useSearchHashtags(query);

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
              router.push(`/search/${query}`);
              closeResultsModal();
            }}
            className={styles.link}
          >
            Search for &quot;{query}&quot;
          </button>

          {hashtags.isSuccess && (
            <div className={styles.hashtags}>
              {hashtags.data?.map((hashtag) => {
                return (
                  <button
                    onClick={() => {
                      router.push(`/search/${hashtag?.text}`);
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

          <div className={styles.people}>
            {people?.map((person) => {
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
