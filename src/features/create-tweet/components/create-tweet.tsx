/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { CloseIcon } from "@/assets/close-icon";
import { LocationIcon } from "@/assets/location-icon";
import { VerifiedIcon } from "@/assets/verified-icon";
import { User } from "@/components/elements/user";
import { ITweet } from "@/features/tweets";

import { EmojiIcon } from "../assets/emoji-icon";
import { GifIcon } from "../assets/gif-icon";
import { ImageIcon } from "../assets/image-icon";
import { PollIcon } from "../assets/poll-icon";
import { ScheduleIcon } from "../assets/schedule-icon";
import { useCreateTweet } from "../hooks/use-create-tweet";
import { IChosenImages } from "../types";

import Action from "./action";
import styles from "./styles/create-tweet.module.scss";

export const CreateTweet = ({
  parent_tweet,
  quoted_tweet,
  in_reply_to_screen_name,
  in_reply_to_status_id,
  placeholder,
}: {
  parent_tweet?: ITweet | null;
  quoted_tweet?: ITweet | null;
  in_reply_to_screen_name?: string | null;
  in_reply_to_status_id?: string | null;
  placeholder?: string | null;
}) => {
  const { data: session } = useSession();

  const [text, setText] = useState("");
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [chosenImages, setChosenImages] = useState<IChosenImages[]>([]);

  const mutation = useCreateTweet({
    setText,
    setChosenImages,
  });

  const chooseImage = async (event: any) => {
    const file = event.target.files[0];

    // reset file input
    if (imageUploadRef.current) imageUploadRef.current.value = "";

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setChosenImages([
          ...chosenImages,
          {
            url: reader.result,
            id: Math.random(),
            file: file,
          },
        ]);
      };
    }
  };

  return (
    <>
      <div className={styles.parentTweet}>
        {parent_tweet && (
          <div className={styles.avatar}>
            <User
              userId={parent_tweet?.author?.id}
              userImage={parent_tweet?.author?.profile_image_url}
            />
            <div className={styles.divider}></div>
          </div>
        )}
        <div className={styles.content}>
          {parent_tweet && (
            <>
              <div className={styles.userDetails}>
                <span className={styles.name}>
                  {parent_tweet?.author?.name}
                </span>

                <span className={styles.verified}>
                  {parent_tweet?.author?.verified && <VerifiedIcon />}
                </span>

                <span className={styles.username}>
                  @{parent_tweet?.author?.email?.split("@")[0]}
                </span>
                <span className={styles.dot}>·</span>
                <span className={styles.date}>
                  {dayjs(parent_tweet?.created_at).format("MMM D")}
                </span>
              </div>
              <div className={styles.tweet}>
                {parent_tweet?.text && (
                  <div className={styles.text}>{parent_tweet?.text}</div>
                )}
              </div>
            </>
          )}

          {in_reply_to_screen_name && (
            <div
              className={`${styles.replying} ${
                !parent_tweet ? styles.withoutQuotedTweet : ""
              }`}
            >
              <span className={styles.replyingTo}>Replying to</span>
              <span className={styles.replyingToUsername}>
                @{in_reply_to_screen_name}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.user}>
          <User
            userId={session?.user?.id}
            userImage={session?.user?.profile_image_url}
          />
        </div>
        <div className={styles.tweet}>
          <div className={styles.text}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholder || "What's happening?"}
            />
            <input
              className={styles.fileInput}
              type="file"
              onChange={chooseImage}
              ref={imageUploadRef}
            />
            <div
              className={`${styles.chosenImages} ${
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
                      <CloseIcon />
                    </button>
                    <img src={image.url as string} alt="" />
                  </div>
                );
              })}
              {/* Quoted Tweet */}
              {quoted_tweet && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={styles.quotedTweet}
                >
                  <div className={styles.userDetails}>
                    <span className={styles.name}>
                      {quoted_tweet?.author?.name}
                    </span>

                    <span className={styles.verified}>
                      {quoted_tweet?.author?.verified && <VerifiedIcon />}
                    </span>

                    <span className={styles.username}>
                      @{quoted_tweet?.author?.email?.split("@")[0]}
                    </span>
                    <span className={styles.dot}>·</span>
                    <span className={styles.date}>
                      {dayjs(quoted_tweet?.created_at).format("MMM D")}
                    </span>
                  </div>

                  <div className={styles.tweet}>
                    {quoted_tweet?.text && (
                      <div className={styles.text}>{quoted_tweet?.text}</div>
                    )}

                    {quoted_tweet?.media?.length > 0 && (
                      <div className={styles.media}>
                        {quoted_tweet?.media &&
                          quoted_tweet?.media.length > 0 && (
                            <div
                              className={`${styles.images} ${
                                quoted_tweet?.media?.length === 1
                                  ? styles.one
                                  : quoted_tweet?.media?.length === 2
                                  ? styles.two
                                  : quoted_tweet?.media?.length === 3
                                  ? styles.three
                                  : quoted_tweet?.media?.length === 4
                                  ? styles.four
                                  : ""
                              }`}
                            >
                              {quoted_tweet?.media?.slice(0, 4).map((media) => {
                                return (
                                  <img
                                    key={media?.id}
                                    src={media?.media_url}
                                    alt=""
                                  />
                                );
                              })}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* Quoted Tweet */}
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.media}>
              <button
                disabled={chosenImages.length >= 4}
                onClick={() => imageUploadRef.current?.click()}
              >
                <Action icon={<ImageIcon />} />
              </button>
              <Action icon={<GifIcon />} />
              <span className={styles.hide}>
                <Action icon={<PollIcon />} />
              </span>
              <Action icon={<EmojiIcon />} />
              <span className={styles.hide}>
                <Action icon={<ScheduleIcon />} />
              </span>
              <Action icon={<LocationIcon />} />
            </div>
            <div className={styles.tweetButton}>
              <button
                onClick={() =>
                  mutation.mutate({
                    text: text,
                    userId: session?.user?.id,
                    files: chosenImages.map((img) => img.file),
                    in_reply_to_screen_name,
                    in_reply_to_status_id,
                    quoted_tweet_id: quoted_tweet ? quoted_tweet.id : null,
                  })
                }
                disabled={text.length === 0}
                className={styles.button}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
