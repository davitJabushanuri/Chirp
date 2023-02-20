import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getConversation } from "../api/get-conversation";
import { IMessage } from "../types";

import styles from "./styles/messages.module.scss";

export const Messages = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const pathname = usePathname();
  const id = pathname?.split("/")[2];

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getConversation(id);

      setMessages(data);
    };

    fetchMessages();
  }, []);

  return <div className={styles.container}></div>;
};
