import { Gear } from "@/assets/gear-icon";
import { HamburgerButton } from "@/components/elements/hamburger-button";

import styles from "./styles/notifications-header.module.scss";

export const NotificationsHeader = () => {
  return (
    <div className={styles.container}>
      <HamburgerButton />
      <h2 className={styles.title}>Notifications</h2>
      <button className={styles.options}>
        <Gear />
      </button>
    </div>
  );
};
