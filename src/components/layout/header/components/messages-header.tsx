import { Gear } from "@/assets/gear-icon";
import { NewMessageIcon } from "@/assets/new-message-icon";

import styles from "./styles/messages-header.module.scss";

export const MessagesHeader = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Messages</h2>
      <div className={styles.buttons}>
        <button>
          <Gear />
        </button>

        <button>
          <NewMessageIcon />
        </button>
      </div>
    </div>
  );
};
