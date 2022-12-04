import { Gear } from "@/assets/gear-icon";

import styles from "./styles/notifications-header.module.scss";

export const NotificationsHeader = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Notifications</h2>
      <button>
        <Gear />
      </button>
    </div>
  );
};
