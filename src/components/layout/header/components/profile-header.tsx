import { BackButton } from "@/components/elements/back-button";
import { IUser } from "@/features/profile";

import styles from "./styles/profile-header.module.scss";

export const ProfileHeader = ({ user }: { user: IUser }) => {
  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <BackButton />
      </div>
      <div className={styles.user}>
        <h2 className={styles.title}>{user?.name}</h2>
        {user?.tweets && (
          <span className={styles.stats}>{user?.tweets?.length} tweets</span>
        )}
      </div>
    </div>
  );
};
