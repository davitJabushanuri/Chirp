"use client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { EmojiIcon } from "@/assets/emoji-icon";
import { GifIcon } from "@/assets/gif-icon";
import { ImageIcon } from "@/assets/image-icon";
import { LocationIcon } from "@/assets/location-icon";
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
  quoted_tweet,
  in_reply_to_screen_name,
  in_reply_to_status_id,
  placeholder,
  isInspectModal = false,
}: {
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
    <div className={styles.container}>
      <UserAvatar
        userId={session?.user?.id}
        userImage={session?.user?.profile_image_url}
      />

      <form>
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
          accept="image/*"
          max={4}
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
              type="button"
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
          <button
            type="button"
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
      </form>
    </div>
  );
};
