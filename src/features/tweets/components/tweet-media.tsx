import Image from "next/image";

import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";

import { IMedia } from "../types";

import styles from "./styles/tweet-media.module.scss";

export const TweetMedia = ({
  media,
  tweetId,
  links = true,
}: {
  media: IMedia[];
  tweetId: string;
  links?: boolean;
}) => {
  const setImageIndex = useInspectTweetImage((state) => state.setImageIndex);
  const openTweetImageModal = useInspectTweetImage(
    (state) => state.openTweetImageModal,
  );
  const setTweetId = useInspectTweetImage((state) => state.setTweetId);

  return (
    <div
      className={`${styles.container} ${
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
          <Image
            onClick={(e) => {
              if (links) {
                e.stopPropagation();
                setImageIndex(index);
                setTweetId(tweetId);
                openTweetImageModal();
              }
            }}
            key={media?.id}
            src={media?.media_url}
            alt="Image"
            width={500}
            height={500}
            className={links ? "" : styles.noLinks}
          />
        );
      })}
    </div>
  );
};
