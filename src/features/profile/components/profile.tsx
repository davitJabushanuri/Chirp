import { usePathname } from "next/navigation";

import { ProfileNavbar } from "./profile-navbar";
import styles from "./styles/profile.module.scss";
import { UserInfo } from "./user-info";

export const Profile = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const id = pathname?.split("/")[2] || "";

  return (
    <div className={styles.profile}>
      <UserInfo id={id} />
      <ProfileNavbar pathname={pathname} id={id} />
      <main>{children}</main>
    </div>
  );
};
