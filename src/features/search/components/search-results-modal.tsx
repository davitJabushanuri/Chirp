import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import { SearchIcon } from "@/assets/search-icon";
import { Progressbar } from "@/components/designs/progressbar";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { TryAgain } from "@/components/elements/try-again";
import { Avatar, UserName, UserScreenName } from "@/features/profile";

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
  const options: HTMLOptionElement[] = Array.from(
    document.querySelectorAll("#search-results-dropdown div[role=option]"),
  );
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const { data, isError, isLoading } = useSearch(query);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Tab") {
        closeResultsModal();
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCurrentIndex((prev) => {
          if (prev === null) return 0;
          else return prev === options.length - 1 ? 0 : prev + 1;
        });
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCurrentIndex((prev) => {
          return !prev ? options.length - 1 : prev - 1;
        });
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (query === "") return;
        else if (currentIndex === -1) {
          router.push(`/search?query=${query}`);
          closeResultsModal();
          setQuery("");
        } else {
          if (currentIndex) {
            const option = options[currentIndex];
            router.push(option.dataset.href!);
            closeResultsModal();
            setQuery("");
          }
        }
      }
    },
    [currentIndex],
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const container = document.getElementById("search-container");

      if (container && !container.contains(target)) {
        closeResultsModal();
      }

      if (target.tagName === "DIV[role=option]") {
        router.push(target.dataset.href!);
        closeResultsModal();
        setQuery("");
      }
    },
    [closeResultsModal, router, setQuery],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick, handleKeyDown]);

  useEffect(() => {
    setCurrentIndex(null);
  }, [query]);

  if (isError) return <TryAgain />;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      aria-multiselectable="false"
      role="listbox"
      id="search-results-dropdown"
      className={`${styles.container}`}
    >
      <div className={styles.progressbar}>
        {!!query && isLoading && <Progressbar />}
      </div>
      {!query ? (
        <div className={styles.placeholder}>
          Try searching for people, topics, or keywords
        </div>
      ) : (
        <div className={styles.results}>
          <SearchResult
            href={`/search?query=${query}`}
            selected={currentIndex === 0}
          >
            <div className={styles.link}>Search for &quot;{query}&quot;</div>
          </SearchResult>
          {data?.hashtags && (
            <div className={styles.hashtags}>
              {data?.hashtags?.map((hashtag, index) => {
                return (
                  <SearchResult
                    href={`/search?query=${hashtag?.text}`}
                    selected={currentIndex === index + 1}
                    key={hashtag?.id}
                  >
                    <div className={styles.hashtag}>
                      <span className={styles.icon}>
                        <SearchIcon />
                      </span>
                      <span className={styles.text}>{hashtag?.text}</span>
                    </div>
                  </SearchResult>
                );
              })}
            </div>
          )}
          {data?.people && data?.people?.length > 0 && (
            <div className={styles.people}>
              {data?.people?.map((person, index) => {
                return (
                  <SearchResult
                    selected={
                      currentIndex === index + 1 + (data?.hashtags?.length ?? 0)
                    }
                    href={`/${person?.id}`}
                    key={person?.id}
                  >
                    <div className={styles.person}>
                      <Avatar userImage={person?.profile_image_url} />
                      <span className={styles.info}>
                        <EllipsisWrapper>
                          <UserName
                            isVerified={person?.verified}
                            name={person?.name}
                          />
                        </EllipsisWrapper>

                        <EllipsisWrapper>
                          <UserScreenName
                            screenName={person?.email?.split("@")[0]}
                          />
                        </EllipsisWrapper>
                      </span>
                    </div>
                  </SearchResult>
                );
              })}
            </div>
          )}
          <SearchResult
            href={`/${query}`}
            selected={currentIndex === options.length - 1}
          >
            <div className={styles.link}>Go to @{query}</div>
          </SearchResult>
        </div>
      )}
    </motion.div>
  );
};

const SearchResult = ({
  children,
  selected,
  href,
}: {
  children: React.ReactNode;
  selected: boolean;
  href?: string;
}) => {
  return (
    <div
      role="option"
      aria-selected={selected}
      data-href={href}
      tabIndex={0}
      className={`${styles.option} ${selected ? styles.selected : ""}`}
    >
      {children}
    </div>
  );
};
