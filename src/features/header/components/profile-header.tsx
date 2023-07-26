import { BackButton } from "@/components/elements/back-button";
import { HeaderHeading } from "@/features/header";

import styles from "./styles/profile-header.module.scss";

export const ProfileHeader = ({
  heading,
  stats,
}: {
  heading: string | undefined;
  stats: string | undefined;
}) => {
  return (
    <div className={styles.container}>
      <BackButton />

      <div className={styles.user}>
        <HeaderHeading title={heading || "Profile"} />
        <span>{stats}</span>
      </div>
    </div>
  );
};
