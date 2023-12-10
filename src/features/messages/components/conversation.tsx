import { IMessage } from "../types";

import { Message } from "./message";
import styles from "./styles/conversation.module.scss";

export const Conversation = ({
  messages,
}: {
  messages: IMessage[] | undefined;
}) => {
  return (
    <div className={styles.container}>
      {messages?.map((message) => {
        return <Message message={message} key={message?.id} />;
      })}
    </div>
  );
};
