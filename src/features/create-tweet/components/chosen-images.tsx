import Image from "next/image";

import { CloseIcon } from "@/assets/close-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";

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
            <div className="absolute right-2 top-2">
              <Tooltip text="Remove">
                <Button
                  aria-label="Remove media"
                  onClick={() => {
                    setChosenImages(
                      chosenImages.filter((img) => img.id !== image.id),
                    );
                  }}
                  className="hover:bg-neutral-500/80 focus-visible:bg-neutral-500/80 focus-visible:outline-secondary-100  active:bg-neutral-600/80"
                >
                  <CloseIcon />
                </Button>
              </Tooltip>
            </div>
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
