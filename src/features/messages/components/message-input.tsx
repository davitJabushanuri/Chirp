import { createId } from "@paralleldrive/cuid2";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";

import { CloseIcon } from "@/assets/close-icon";
import { EmojiIcon } from "@/assets/emoji-icon";
import { GifIcon } from "@/assets/gif-icon";
import { ImageIcon } from "@/assets/image-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";
import { IChosenImages } from "@/features/create-tweet";
import { socket } from "@/lib/socket-io";

import { SendIcon } from "../assets/send-icon";
import { IMessage } from "../types";

import styles from "./styles/message-input.module.scss";

export const MessageInput = ({
  conversation_id,
  sender_id,
  receiver_id,
}: {
  conversation_id: string | undefined;
  sender_id: string | undefined;
  receiver_id: string | undefined;
}) => {
  const [text, setText] = useState("");
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [chosenImage, setChosenImage] = useState<IChosenImages | null>(null);

  const queryClient = useQueryClient();

  const chooseImage = (e: any) => {
    const file = e.target.files[0];

    if (imageUploadRef.current) imageUploadRef.current.value = "";

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result as string;

        img.onload = () => {
          console.log();
          setChosenImage({
            url: reader.result,
            id: Math.random(),
            file: file,
            width: img.width,
            height: img.height,
          });
        };
      };
    }
  };

  const onFocus = () => {
    const chat = queryClient.getQueryData<IMessage[]>([
      "chat",
      conversation_id,
    ]);
    if (!chat) return;
    const lastMessage = chat.at(-1);

    if (lastMessage?.sender_id === sender_id) return;

    socket.emit("status", { status: "seen", message_id: lastMessage?.id });
  };

  const createMessage = ({
    id,
    text,
    conversation_id,
    sender_id,
    receiver_id,
    image,
    image_width,
    image_height,
    file,
    status,
  }: {
    id: string;
    text: string;
    conversation_id: string | undefined;
    sender_id: string | undefined;
    receiver_id: string | undefined;
    image: string | ArrayBuffer | null;
    image_width: number | null;
    image_height: number | null;
    file: File | null;
    status: "sending" | "sent" | "seen" | "failed";
  }) => {
    return {
      id,
      text,
      conversation_id,
      sender_id,
      receiver_id,
      image,
      image_width,
      image_height,
      file,
      status,
    };
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const id = createId();

    const message = createMessage({
      id,
      text,
      conversation_id,
      sender_id,
      receiver_id,
      image: chosenImage?.url ?? null,
      image_width: chosenImage?.width ?? null,
      image_height: chosenImage?.height ?? null,
      file: chosenImage?.file ?? null,
      status: "sending",
    });

    queryClient.setQueryData(["chat", conversation_id], (oldData: any) => {
      return [...oldData, message];
    });

    socket.emit("message", {
      id,
      text,
      image: chosenImage ? chosenImage.file : null,
      image_width: chosenImage ? chosenImage.width : null,
      image_height: chosenImage ? chosenImage.height : null,
      conversation_id,
      sender_id,
      receiver_id,
    });

    setText("");
    setChosenImage(null);
  };

  return (
    <aside aria-label="Start a new message" className={styles.container}>
      <form onSubmit={onSubmit}>
        <div
          className={`${styles.inputContainer} ${chosenImage ? styles.row : styles.column}`}
        >
          {chosenImage ? (
            <div className={styles.mediaPreview}>
              <div className={styles.imageContainer}>
                <div className={styles.remove}>
                  <Tooltip text="Remove">
                    <Button
                      onClick={() => {
                        setChosenImage(null);
                      }}
                      aria-label="Remove media"
                      className="bg-black-300/80 outline-tertiary-100 backdrop-blur-sm hover:bg-black-200/80 active:bg-black-100/80"
                    >
                      <CloseIcon />
                    </Button>
                  </Tooltip>
                </div>
                <Image
                  src={(chosenImage.url as string) ?? ""}
                  alt=""
                  width={chosenImage.width}
                  height={chosenImage.height}
                />
              </div>
            </div>
          ) : (
            <div className={styles.actions}>
              <input
                className={styles.fileInput}
                type="file"
                onChange={chooseImage}
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
              onFocus();
            }}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start a new message"
          />
        </div>

        <Tooltip text="Send">
          <Button
            aria-label="Send"
            type="submit"
            disabled={text === "" && !chosenImage}
            className="fill-primary-100 p-[0.44rem] hover:bg-primary-100/10 active:bg-primary-100/20 [&>svg]:w-[1.250rem]"
          >
            <SendIcon />
          </Button>
        </Tooltip>
      </form>
    </aside>
  );
};
