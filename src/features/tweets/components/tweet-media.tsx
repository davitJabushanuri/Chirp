"use client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { Modal } from "@/components/elements/modal";

import { IMedia } from "../types";

import { InspectTweetImageModal } from "./inspect-tweet-image-modal";
import styles from "./styles/tweet-media.module.scss";

export const TweetMedia = ({
  media,
  tweetId,
}: {
  media: IMedia[];
  tweetId: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className={styles.container}>
      <div
        aria-label="Media"
        className={`${styles.media} ${
          media?.length === 1
            ? styles.one
            : media?.length === 2
              ? styles.two
              : media?.length === 3
                ? styles.three
                : media?.length === 4
                  ? styles.four
                  : ""
        }`}
      >
        {media?.map((media, index) => {
          return (
            <button
              key={media?.id}
              className={styles.mediaItem}
              onClick={(e) => {
                e.stopPropagation();
                setImageIndex(index);
                setIsModalOpen(true);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            >
              <Image
                src={media?.media_url}
                aria-label="Image"
                alt="Image"
                width={1000}
                height={1000}
                draggable={true}
              />
            </button>
          );
        })}

        <AnimatePresence>
          {isModalOpen && (
            <Modal
              onClose={() => setIsModalOpen(false)}
              background="none"
              closeOnBackdropClick={true}
              disableScroll={true}
            >
              <InspectTweetImageModal
                tweetId={tweetId}
                imageIndex={imageIndex}
                onClose={() => setIsModalOpen(false)}
              />
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
