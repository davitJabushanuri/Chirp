"use client";
import { useSession } from "next-auth/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { EmojiIcon } from "@/assets/emoji-icon";
import { GifIcon } from "@/assets/gif-icon";
import { ImageIcon } from "@/assets/image-icon";
import { LocationIcon } from "@/assets/location-icon";
import { UserAvatar } from "@/features/profile";
import { ITweet } from "@/features/tweets";

import { PollIcon } from "../assets/poll-icon";
import { ScheduleIcon } from "../assets/schedule-icon";
import { useCreateTweet } from "../hooks/use-create-tweet";
import { IChosenImages } from "../types";
import { resizeTextarea } from "../utils/resize-textarea";

import Action from "./action";
import { ChosenImages } from "./chosen-images";
import { CreateTweetQuote } from "./create-tweet-quote";
import styles from "./styles/create-tweet.module.scss";

export const CreateTweet = ({
  quoted_tweet,
  in_reply_to_screen_name,
  in_reply_to_status_id,
  placeholder = "What's happening?",
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
  const [chosenImages, setChosenImages] = useState<IChosenImages[]>([]);

  const mutation = useCreateTweet({
    setText,
    setChosenImages,
  });

  const chooseImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;

    if (files) {
      if (files?.length + chosenImages.length > 4) {
        return toast("Please choose either 1 GIF or upto 4 photos.");
      }

      for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const image = new Image();
          image.src = reader.result as string;
          setChosenImages((prev) => {
            return [
              ...prev,
              {
                url: reader.result,
                id: Math.random(),
                file: file,
                width: image.width,
                height: image.height,
              },
            ];
          });
        };
      }
    }

    event.target.value = "";
  };

  const textAreaRef = useRef<HTMLTextAreaElement>();

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    resizeTextarea(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    if (!textAreaRef.current) return;
    resizeTextarea(textAreaRef.current);
  }, [text]);

  if (!session) return null;

  return (
    <div className={styles.container}>
      <UserAvatar
        userId={session?.user?.id}
        userImage={session?.user?.profile_image_url}
      />

      <form>
        <div className={styles.text}>
          <textarea
            ref={inputRef}
            style={{ height: "0" }}
            contentEditable="true"
            aria-multiline="true"
            aria-label="Tweet text"
            aria-autocomplete="list"
            spellCheck="true"
            tabIndex={0}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder as string}
          />
        </div>

        {chosenImages.length > 0 && (
          <ChosenImages
            chosenImages={chosenImages}
            setChosenImages={setChosenImages}
          />
        )}

        {quoted_tweet && (
          <div className={styles.quotedTweet}>
            <CreateTweetQuote tweet={quoted_tweet} />
          </div>
        )}

        <div className={styles.actions}>
          <div className={styles.tweet_actions}>
            <button
              className={styles.media}
              aria-label="Add photos or video"
              type="button"
              title="Media"
              tabIndex={0}
              disabled={chosenImages.length >= 4}
            >
              <label htmlFor="media">
                <Action icon={<ImageIcon />} />

                <input
                  id="media"
                  className={styles.fileInput}
                  tabIndex={-1}
                  type="file"
                  onChange={(e) => chooseImages(e)}
                  accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
                  max={4}
                  multiple
                  disabled={chosenImages.length >= 4}
                />
              </label>
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
