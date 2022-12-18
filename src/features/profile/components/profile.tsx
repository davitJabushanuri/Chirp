import { ProfileNavbar } from "./profile-navbar";
import styles from "./styles/profile.module.scss";
import { UserInfo } from "./user-info";

export const Profile = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.profile}>
      <UserInfo />
      <ProfileNavbar />
      <main>{children}</main>
    </div>
  );
};
