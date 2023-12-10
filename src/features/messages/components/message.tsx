import dayjs from "dayjs";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { IMessage } from "../types";

import styles from "./styles/message.module.scss";

export const Message = ({ message }: { message: IMessage }) => {
  const { data: session } = useSession();
  const isSender = message?.sender_id === session?.user?.id;

  // const { data: media, isLoading, isError } = useGetMedia(message?.id);

  return (
    <div className={`${styles.container} ${isSender ? styles.isSender : ""}`}>
      {message?.media?.length > 0 && (
        <div className={styles.mediaContainer}>
          {message?.media?.map((media) => {
            return (
              <div key={media.id} className={styles.media}>
                <Image src={media?.media_url} alt="" height={500} width={500} />
              </div>
            );
          })}
        </div>
      )}

      {message?.text && (
        <div className={styles.text}>
          <p>{message?.text}</p>
        </div>
      )}

      <div className={styles.info}>
        <div className={styles.time}>
          {dayjs(message?.created_at).format("h:mm A")}
        </div>
        <div className={styles.delivered}>Seen</div>
      </div>
    </div>
  );
};
