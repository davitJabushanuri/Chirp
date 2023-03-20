/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
"use client";
import Image from "next/image";
import { useState } from "react";

import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";

import { BackwardArrowIcon } from "../assets/backward-arrow-icon";
import { ForwardArrowIcon } from "../assets/forward-arrow-icon";
import { IMedia } from "../types";

import styles from "./styles/image-carousel.module.scss";

export const ImageCarousel = ({ images }: { images: IMedia[] | undefined }) => {
  const imageIndex = useInspectTweetImage((state) => state.imageIndex);

  const [activeSlide, setActiveSlide] = useState(imageIndex || 0);

  return (
    <div className={styles.container}>
      <ForwardButton
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
        lastIndex={images && images?.length - 1}
      />
      <BackwardButton
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
      <div className={styles.imageContainer}>
        {images && (
          <Image
            onClick={(e) => e.stopPropagation()}
            src={images[activeSlide]?.media_url}
            alt=""
            width={1000}
            height={1000}
          />
        )}
      </div>
    </div>
  );
};

const ForwardButton = ({
  activeSlide = 0,
  setActiveSlide,
  lastIndex = 3,
}: {
  activeSlide: number;
  setActiveSlide: (activeSlide: number) => void;
  lastIndex: number | undefined;
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setActiveSlide(activeSlide + 1);
      }}
      className={`${styles.forwardButton} ${
        activeSlide === lastIndex ? styles.hide : ""
      }`}
    >
      <ForwardArrowIcon />
    </button>
  );
};

const BackwardButton = ({
  activeSlide = 0,
  setActiveSlide,
}: {
  activeSlide: number;
  setActiveSlide: (activeSlide: number) => void;
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setActiveSlide(activeSlide - 1);
      }}
      className={`${styles.backwardButton} ${
        activeSlide === 0 ? styles.hide : ""
      }`}
    >
      <BackwardArrowIcon />
    </button>
  );
};
