"use client";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { EmojiIcon } from "@/assets/emoji-icon";
import { GifIcon } from "@/assets/gif-icon";
import { ImageIcon } from "@/assets/image-icon";
import { LocationIcon } from "@/assets/location-icon";
import { VerifiedIcon } from "@/assets/verified-icon";
import { UserAvatar } from "@/features/profile";
import { ITweet } from "@/features/tweets";
import { QuotedTweet } from "@/features/tweets";

import { PollIcon } from "../assets/poll-icon";
import { ScheduleIcon } from "../assets/schedule-icon";
import { useCreateTweet } from "../hooks/use-create-tweet";
import { IChosenImages } from "../types";

import Action from "./action";
import { ChosenImages } from "./chosen-images";
import styles from "./styles/create-tweet.module.scss";

export const CreateTweet = ({
  parent_tweet,
  quoted_tweet,
  in_reply_to_screen_name,
  in_reply_to_status_id,
  placeholder,
  isInspectModal = false,
}: {
  parent_tweet?: ITweet | null;
  quoted_tweet?: ITweet | null;
  in_reply_to_screen_name?: string | null;
  in_reply_to_status_id?: string | null;
  placeholder?: string | null;
  isInspectModal?: boolean;
}) => {
  const { data: session } = useSession();

  const [text, setText] = useState("");
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [chosenImages, setChosenImages] = useState<IChosenImages[]>([]);

  const mutation = useCreateTweet({
    setText,
    setChosenImages,
  });

  const chooseImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setChosenImages: (images: IChosenImages[]) => void,
  ) => {
    const file = event?.target?.files?.[0];

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

  if (!session) return null;

  return (
    <>
      <div className={styles.parentTweet}>
        {parent_tweet && (
          <div className={styles.avatar}>
            <UserAvatar
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
        </div>
      </div>

      <div className={styles.container}>
        <UserAvatar
          userId={session?.user?.id}
          userImage={session?.user?.profile_image_url}
        />

        <div className={styles.tweet}>
          <div className={styles.text}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholder || "What's happening?"}
            />
          </div>
          <input
            className={styles.fileInput}
            type="file"
            onChange={(e) => chooseImage(e, setChosenImages)}
            ref={imageUploadRef}
          />
          {chosenImages.length > 0 && (
            <ChosenImages
              chosenImages={chosenImages}
              setChosenImages={setChosenImages}
            />
          )}

          {quoted_tweet && <QuotedTweet tweet={quoted_tweet} />}

          <div className={styles.actions}>
            <div className={styles.media}>
              <button
                disabled={chosenImages.length >= 4}
                onClick={() => imageUploadRef.current?.click()}
              >
                <Action icon={<ImageIcon />} />
              </button>
              <Action icon={<GifIcon />} />
              {!isInspectModal && (
                <span className={styles.hide}>
                  <Action icon={<PollIcon />} />
                </span>
              )}
              <Action icon={<EmojiIcon />} />
              {!isInspectModal && (
                <span className={styles.hide}>
                  <Action icon={<ScheduleIcon />} />
                </span>
              )}
              <Action icon={<LocationIcon />} />
            </div>
          </div>
        </div>
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
          className={styles.tweetButton}
        >
          Tweet
        </button>
      </div>
    </>
  );
};
