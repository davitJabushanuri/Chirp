import { BackButton } from "@/components/elements/back-button";

import styles from "./styles/profile-header.module.scss";

export const ProfileHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <BackButton />
      </div>
      <h2 className={styles.title}>Profile</h2>
    </div>
  );
};
