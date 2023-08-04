"use client";
import { usePathname } from "next/navigation";

import { IUser } from "@/features/profile";
import { useEditProfile } from "@/stores/use-edit-profile";
import { useInspectImage } from "@/stores/use-inspect-profile-image";

import { EditProfileModal } from "./edit-profile-modal";
import { InspectImageModal } from "./inspect-image-modal";
import { ProfileNavigation } from "./profile-navigation";
import styles from "./styles/profile.module.scss";
import { UserInfo } from "./user-info";

export const Profile = ({ user }: { user: IUser }) => {
  const pathname = usePathname();
  const id = pathname?.split("/")[1] || "";
  const isEditProfileModalOpen = useEditProfile(
    (state) => state.isEditProfileModalOpen,
  );
  const isInspectModalOpen = useInspectImage(
    (state) => state.isInspectModalOpen,
  );

  return (
    <div className={styles.container}>
      <UserInfo user={user} />
      <ProfileNavigation pathname={pathname} id={id} />
      {isEditProfileModalOpen && <EditProfileModal user={user} />}
      {isInspectModalOpen && <InspectImageModal />}
    </div>
  );
};
