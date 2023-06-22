import Image from "next/image";

import { CloseButton } from "@/components/designs/close-button";

import { IChosenImages } from "../types";

import styles from "./styles/chosen-images.module.scss";

export const ChosenImages = ({
  chosenImages,
  setChosenImages,
}: {
  chosenImages: IChosenImages[];
  setChosenImages: (images: IChosenImages[]) => void;
}) => {
  return (
    <div
      className={`${styles.container} ${
        chosenImages.length === 1
          ? styles.one
          : chosenImages.length === 2
          ? styles.two
          : chosenImages.length === 3
          ? styles.three
          : chosenImages.length === 4
          ? styles.four
          : ""
      }`}
    >
      {chosenImages.map((image) => {
        return (
          <div key={image.id} className={styles.imageContainer}>
            <button
              onClick={() => {
                setChosenImages(
                  chosenImages.filter((img) => img.id !== image.id),
                );
              }}
              className={styles.close}
            >
              <CloseButton />
            </button>
            <Image
              src={image.url as string}
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        );
      })}
    </div>
  );
};
