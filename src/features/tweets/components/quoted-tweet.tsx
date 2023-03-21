/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { VerifiedIcon } from "@/assets/verified-icon";
import { Avatar } from "@/components/designs/avatar";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";

import { ITweet } from "../types";

import styles from "./styles/quoted-tweet.module.scss";

export const QuotedTweet = ({ tweet }: { tweet: ITweet }) => {
  const router = useRouter();

  const setImageIndex = useInspectTweetImage((state) => state.setImageIndex);
  const openTweetImageModal = useInspectTweetImage(
    (state) => state.openTweetImageModal,
  );
  const setTweetId = useInspectTweetImage((state) => state.setTweetId);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/status/${tweet.id}`);
      }}
      className={styles.container}
    >
      <div className={styles.userDetails}>
        <span className={styles.avatar}>
          <Avatar
            userImage={tweet?.author?.profile_image_url}
            width={46}
            height={46}
          />
        </span>

        <span className={styles.name}>{tweet?.author?.name}</span>

        <span className={styles.verified}>
          {tweet?.author?.verified && <VerifiedIcon />}
        </span>

        <span className={styles.username}>
          @{tweet?.author?.email?.split("@")[0]}
        </span>
        <span className={styles.dot}>·</span>
        <span className={styles.date}>
          {dayjs(tweet?.created_at).format("MMM D")}
        </span>
      </div>

      <div className={styles.tweet}>
        {tweet?.text && <div className={styles.text}>{tweet?.text}</div>}

        {tweet?.media?.length > 0 && (
          <div className={styles.media}>
            {tweet?.media && tweet?.media.length > 0 && (
              <div
                className={`${styles.images} ${
                  tweet?.media?.length === 1
                    ? styles.one
                    : tweet?.media?.length === 2
                    ? styles.two
                    : tweet?.media?.length === 3
                    ? styles.three
                    : tweet?.media?.length === 4
                    ? styles.four
                    : ""
                }`}
              >
                {tweet?.media?.slice(0, 4).map((media, index) => {
                  return (
                    <Image
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageIndex(index);
                        setTweetId(tweet?.id);
                        openTweetImageModal();
                      }}
                      key={media?.id}
                      src={media?.media_url}
                      alt=""
                      width={500}
                      height={500}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
