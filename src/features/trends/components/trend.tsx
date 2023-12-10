"use client";
import { useRouter } from "next/navigation";

import { useSearchStore } from "@/features/search";

import { iTrendProps } from "../types";

import styles from "./styles/trend.module.scss";
import { TrendOptions } from "./trend-options";

export const Trend = ({ ranking = 1, title, tweets = 1 }: iTrendProps) => {
  const router = useRouter();
  const setQuery = useSearchStore((state) => state.setQuery);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setQuery(title);
          router.push(`/search?query=${title.toLowerCase()}`);
        }
      }}
      onClick={() => {
        setQuery(title);
        router.push(`/search?query=${title.toLowerCase()}`);
      }}
      className={styles.container}
    >
      <div className={styles.trend}>
        <div className={styles.stats}>
          <span>{ranking}</span> <span className={styles.dot}></span>
          <span>Trending</span>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.stats}>
          {tweets} {tweets === 1 ? "tweet" : "tweets"}
        </div>
      </div>
      <TrendOptions />
    </div>
  );
};
