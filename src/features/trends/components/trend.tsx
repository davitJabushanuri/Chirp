/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { SadFaceIcon } from "@/assets/sad-face-icon";
import { Action, ActionsModal } from "@/components/elements/actions-modal";
import { useSearchStore } from "@/features/search";

import { iTrendProps } from "../types";

import styles from "./styles/trend.module.scss";

export const Trend = ({ ranking = 1, title, tweets = 1 }: iTrendProps) => {
  const router = useRouter();
  const setQuery = useSearchStore((state) => state.setQuery);

  return (
    <div
      onClick={() => {
        setQuery(title);
        router.push(`/search/${title.toLowerCase()}`);
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

const TrendOptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.options}>
      <button
        className={styles.optionsButton}
        onClick={() => setIsModalOpen(true)}
      >
        <DotIcon />
      </button>
      {isModalOpen && (
        <ActionsModal setIsModalOpen={setIsModalOpen}>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <Action icon={<SadFaceIcon />} text={`Not interested in this`} />
          </button>

          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <Action
              icon={<SadFaceIcon />}
              text={`This trend is harmful or spammy`}
            />
          </button>
        </ActionsModal>
      )}
    </div>
  );
};
