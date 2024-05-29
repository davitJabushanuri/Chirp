import { createId } from "@paralleldrive/cuid2";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";

import { CloseIcon } from "@/assets/close-icon";
import { EmojiIcon } from "@/assets/emoji-icon";
import { GifIcon } from "@/assets/gif-icon";
import { ImageIcon } from "@/assets/image-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";
import { socket } from "@/lib/socket-io";

import { postImage } from "../api/post-image";
import { SendIcon } from "../assets/send-icon";
import { IInfiniteChat } from "../hooks/use-get-chat";
import { chooseImage } from "../utils/choose-image";
import { handleFocus } from "../utils/handle-focus";

import styles from "./styles/message-input.module.scss";

export interface IMessage {
  text: string | null;
  image_width: number | null;
  image_height: number | null;
  image_preview?: string | ArrayBuffer | null;
  image_file?: File | null;
}

export const MessageInput = ({
  conversation_id,
  sender_id,
  receiver_id,
}: {
  conversation_id: string | undefined;
  sender_id: string | undefined;
  receiver_id: string | undefined;
}) => {
  const imageUploadRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<IMessage>({
    text: null,
    image_width: null,
    image_height: null,
    image_preview: null,
    image_file: null,
  });

  const queryClient = useQueryClient();

  interface INewMessage {
    id: string;
    text: string | null;
    image: string | null;
    image_width: number | null;
    image_height: number | null;
    conversation_id: string | undefined;
    sender_id: string | undefined;
    receiver_id: string | undefined;
    status: "sending" | "sent" | "seen" | "delivered" | "failed";
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const id = createId();

    const newMessage: INewMessage = {
      id,
      text: message.text,
      status: "sending",
      conversation_id,
      sender_id,
      receiver_id,
      image: null,
      image_width: null,
      image_height: null,
    };

    if (message.image_file) {
      const { url } = await postImage(message.image_file, "images");
      newMessage.image = url;
      newMessage.image_width = message.image_width;
      newMessage.image_height = message.image_height;
    }

    queryClient.setQueryData(
      ["chat", conversation_id],
      (oldData: InfiniteData<IInfiniteChat>) => {
        const lastPage = oldData.pages?.at(0);
        if (lastPage?.chat && lastPage.chat.length >= 20) {
          return {
            ...oldData,
            pages: [
              {
                chat: [newMessage],
                nextId: newMessage.id,
              },
              ...oldData.pages,
            ],
          };
        } else {
          return {
            ...oldData,
            pages: [
              {
                chat: [newMessage, ...(lastPage?.chat ?? [])],
                nextId: lastPage?.nextId,
              },
              ...oldData.pages.slice(1),
            ],
          };
        }
      },
    );

    socket.emit("message", {
      id: newMessage.id,
      text: newMessage.text,
      image: newMessage.image,
      image_width: newMessage.image_width,
      image_height: newMessage.image_height,
      conversation_id,
      sender_id,
      receiver_id,
    });

    setMessage({
      text: null,
      image_width: null,
      image_height: null,
      image_preview: null,
      image_file: null,
    });
  };

  return (
    <aside aria-label="Start a new message" className={styles.container}>
      <form onSubmit={onSubmit}>
        <div
          className={`${styles.inputContainer} ${message.image_file ? styles.row : styles.column}`}
        >
          {message.image_file ? (
            <div className={styles.mediaPreview}>
              <div className={styles.imageContainer}>
                <div className={styles.remove}>
                  <Tooltip text="Remove">
                    <Button
                      onClick={() => {
                        setMessage((prev) => {
                          return {
                            ...prev,
                            image_preview: null,
                            image_file: null,
                            image_width: null,
                            image_height: null,
                          };
                        });
                      }}
                      aria-label="Remove media"
                      className="bg-black-300/80 outline-tertiary-100 backdrop-blur-sm hover:bg-black-200/80 active:bg-black-100/80"
                    >
                      <CloseIcon />
                    </Button>
                  </Tooltip>
                </div>
                <Image
                  src={(message.image_preview as string) ?? ""}
                  alt=""
                  width={message.image_width as number}
                  height={message.image_height as number}
                />
              </div>
            </div>
          ) : (
            <div className={styles.actions}>
              <input
                className={styles.fileInput}
                type="file"
                onChange={(e) => chooseImage(e, imageUploadRef, setMessage)}
                ref={imageUploadRef}
              />
              <Tooltip text="Media">
                <Button
                  type="button"
                  onClick={() => imageUploadRef.current?.click()}
                  aria-label="Add Photo or video"
                  className="fill-primary-100 p-[0.44rem] hover:bg-primary-100/10 active:bg-primary-100/20 [&>svg]:w-[1.250rem]"
                >
                  <ImageIcon />
                </Button>
              </Tooltip>

              <Tooltip text="GIF">
                <Button
                  type="button"
                  aria-label="Add a GIF"
                  className="fill-primary-100 p-[0.44rem] hover:bg-primary-100/10 active:bg-primary-100/20 [&>svg]:w-[1.250rem]"
                >
                  <GifIcon />
                </Button>
              </Tooltip>

              <Tooltip text="Emoji">
                <Button
                  type="button"
                  aria-haspopup="menu"
                  aria-label="Add emoji"
                  className="fill-primary-100 p-[0.44rem] hover:bg-primary-100/10 active:bg-primary-100/20 [&>svg]:w-[1.250rem]"
                >
                  <EmojiIcon />
                </Button>
              </Tooltip>
            </div>
          )}

          <input
            onFocus={() => {
              handleFocus(queryClient, socket, sender_id, conversation_id);
            }}
            type="text"
            value={message.text ?? ""}
            onChange={(e) => setMessage({ ...message, text: e.target.value })}
            placeholder="Start a new message"
          />
        </div>

        <Tooltip text="Send">
          <Button
            aria-label="Send"
            type="submit"
            disabled={message.text === null && message.image_file === null}
            className="fill-primary-100 p-[0.44rem] hover:bg-primary-100/10 active:bg-primary-100/20 [&>svg]:w-[1.250rem]"
          >
            <SendIcon />
          </Button>
        </Tooltip>
      </form>
    </aside>
  );
};
