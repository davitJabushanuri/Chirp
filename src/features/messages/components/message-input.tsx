import { zodResolver } from "@hookform/resolvers/zod";
import { createId } from "@paralleldrive/cuid2";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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

export interface IFile {
  file: File | null;
  width: number | null;
  height: number | null;
  preview: string | ArrayBuffer | null;
}

export interface Inputs {
  text: string;
  image: IFile;
}

interface IMessage {
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

const messageSchema = z.object({
  text: z
    .string({
      required_error: "Please enter a message",
      description: "The message to send",
    })
    .optional(),
  image: z
    .object({
      file: z.instanceof(File).nullable(),
      width: z.number().nullable(),
      height: z.number().nullable(),
      preview: z.string().nullable(),
    })
    .optional(),
});

export const MessageInput = ({
  conversation_id,
  sender_id,
  receiver_id,
}: {
  conversation_id: string | undefined;
  sender_id: string | undefined;
  receiver_id: string | undefined;
}) => {
  const { register, handleSubmit, watch, setValue, reset, setFocus } =
    useForm<Inputs>({
      defaultValues: {
        text: "",
        image: {
          file: null,
          width: null,
          height: null,
          preview: null,
        },
      },
      resolver: zodResolver(messageSchema),
    });

  const image = watch("image");
  const text = watch("text");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const id = createId();
    const message: IMessage = {
      id,
      text: null,
      image: null,
      image_width: null,
      image_height: null,
      conversation_id,
      sender_id,
      receiver_id,
      status: "sending",
    };

    message.text = data.text;
    if (data.image?.file) {
      const { url } = await postImage(data.image.file, "images");
      message.image = url;
      message.image_width = data.image.width;
      message.image_height = data.image.height;
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
                chat: [message],
                nextId: message.id,
              },
              ...oldData.pages,
            ],
          };
        } else {
          return {
            ...oldData,
            pages: [
              {
                chat: [message, ...(lastPage?.chat ?? [])],
                nextId: lastPage?.nextId,
              },
              ...oldData.pages.slice(1),
            ],
          };
        }
      },
    );

    socket.emit("message", message);

    reset();
  };

  const imageUploadRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  return (
    <aside aria-label="Start a new message" className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`${styles.inputContainer} ${image?.file ? styles.row : styles.column}`}
        >
          {image?.file ? (
            <div className={styles.mediaPreview}>
              <div className={styles.imageContainer}>
                <div className={styles.remove}>
                  <Tooltip text="Remove">
                    <Button
                      type="button"
                      onClick={() => {
                        setValue("image", {
                          file: null,
                          width: null,
                          height: null,
                          preview: null,
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
                  src={(image?.preview as string) ?? ""}
                  alt=""
                  width={image?.width as number}
                  height={image?.height as number}
                />
              </div>
            </div>
          ) : (
            <div className={styles.actions}>
              <input
                className={styles.fileInput}
                type="file"
                {...register("image")}
                onChange={(e) => {
                  chooseImage(e, imageUploadRef, setValue);
                  setFocus("text");
                }}
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
            {...register("text")}
            placeholder="Start a new message"
          />
        </div>

        <Tooltip text="Send">
          <Button
            aria-label="Send"
            onClick={() => {
              setFocus("text");
            }}
            type="submit"
            className="fill-primary-100 p-[0.44rem] hover:bg-primary-100/10 active:bg-primary-100/20 [&>svg]:w-[1.250rem]"
            disabled={!text && !image?.file}
          >
            <SendIcon />
          </Button>
        </Tooltip>
      </form>
    </aside>
  );
};
