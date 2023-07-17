"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

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

const TrendOptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.options}>
      <button
        aria-expanded={isModalOpen}
        aria-haspopup="menu"
        aria-label="More"
        tabIndex={0}
        className={styles.optionsButton}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        data-tooltip-id="trends-option-tooltip"
        data-tooltip-content={`More `}
        data-tooltip-delay-show={500}
      >
        <DotIcon />
      </button>

      <Tooltip id="trends-option-tooltip" place="bottom" />
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
