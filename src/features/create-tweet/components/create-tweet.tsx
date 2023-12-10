"use client";
import { useSession } from "next-auth/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { GifIcon } from "@/assets/gif-icon";
import { ImageIcon } from "@/assets/image-icon";
import { LocationIcon } from "@/assets/location-icon";
import { Avatar, LinkToProfile } from "@/features/profile";
import { ITweet } from "@/features/tweets";

import { PollIcon } from "../assets/poll-icon";
import { ScheduleIcon } from "../assets/schedule-icon";
import { useCreateTweet } from "../hooks/use-create-tweet";
import { IChosenImages } from "../types";
import { chooseImages } from "../utils/choose-images";
import { resizeTextarea } from "../utils/resize-textarea";

import Action from "./action";
import { ChosenImages } from "./chosen-images";
import { CreateTweetQuote } from "./create-tweet-quote";
import { EmojiButton } from "./emoji-button";
import styles from "./styles/create-tweet.module.scss";
import { TextProgressBar } from "./text-progress-bar";

export const CreateTweet = ({
  quoted_tweet,
  in_reply_to_screen_name,
  in_reply_to_status_id,
  placeholder = "What's happening?",
  isInspectModal = false,
  container = "tweet",
  inputId = "tweet-text",
}: {
  quoted_tweet?: ITweet | null;
  in_reply_to_screen_name?: string | null;
  in_reply_to_status_id?: string | null;
  placeholder?: string | null;
  isInspectModal?: boolean;
  container?: "tweet" | "modal" | "comment";
  inputId?: string;
}) => {
  const { data: session } = useSession();

  const [text, setText] = useState("");
  const [chosenImages, setChosenImages] = useState<IChosenImages[]>([]);

  const mutation = useCreateTweet({
    setText,
    setChosenImages,
  });

  const textAreaRef = useRef<HTMLTextAreaElement>();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      <div className={styles.left}>
        <div className={styles.avatar}>
          <LinkToProfile userId={session?.user?.id}>
            <Avatar userImage={session?.user?.profile_image_url} />
          </LinkToProfile>
        </div>
      </div>

      <form>
        <div
          className={`${styles.content} ${
            container === "modal"
              ? styles.modalHeight
              : container === "comment"
                ? styles.commentHeight
                : ""
          }`}
        >
          <div className={styles.text}>
            <textarea
              id={inputId}
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

          {chosenImages && (
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
        </div>

        <div className={styles.actions}>
          <div className={styles.tweet_actions}>
            <button
              type="button"
              className={styles.action}
              aria-label="Add photos or video"
              data-title="Media"
              tabIndex={0}
              disabled={chosenImages.length >= 4}
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              <Action icon={<ImageIcon />} />

              <input
                ref={fileInputRef}
                id="media"
                className={styles.fileInput}
                tabIndex={-1}
                type="file"
                onChange={(e) =>
                  chooseImages({
                    event: e,
                    chosenImagesLength: chosenImages.length,
                    setChosenImages,
                  })
                }
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
                max={4}
                multiple
                disabled={chosenImages.length >= 4}
              />
            </button>

            <button
              type="button"
              className={styles.action}
              aria-label="Add a GIF"
              data-title="GIF"
              tabIndex={0}
            >
              <Action icon={<GifIcon />} />
            </button>

            {!isInspectModal && (
              <span className={styles.hide}>
                <button
                  type="button"
                  className={styles.action}
                  aria-label="Add poll"
                  data-title="Poll"
                  tabIndex={0}
                >
                  <Action icon={<PollIcon />} />
                </button>
              </span>
            )}

            <EmojiButton setText={setText} inputId={inputId} />

            {!isInspectModal && (
              <span className={styles.hide}>
                <button
                  type="button"
                  className={styles.action}
                  aria-label="Schedule Tweet"
                  data-title="Schedule"
                  tabIndex={0}
                >
                  <Action icon={<ScheduleIcon />} />
                </button>
              </span>
            )}

            <button
              type="button"
              className={styles.action}
              aria-label="Tag Location"
              data-title="Location"
              tabIndex={0}
            >
              <Action icon={<LocationIcon />} />
            </button>
          </div>

          <div className={styles.buttons}>
            {text.length > 0 && <TextProgressBar progress={text.length} />}
            <button
              type="button"
              aria-label="Add Tweet"
              tabIndex={0}
              onClick={() =>
                mutation.mutate({
                  text: text.trim(),
                  userId: session?.user?.id,
                  files: chosenImages.map((img) => img.file),
                  in_reply_to_screen_name,
                  in_reply_to_status_id,
                  quoted_tweet_id: quoted_tweet ? quoted_tweet.id : null,
                })
              }
              disabled={
                (text.length === 0 || text.length > 280) &&
                chosenImages.length === 0
              }
              className={styles.tweetButton}
            >
              Tweet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
