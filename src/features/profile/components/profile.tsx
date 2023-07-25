"use client";
import { usePathname } from "next/navigation";

import { IUser } from "@/features/profile";
import { useEditProfile } from "@/stores/use-edit-profile";
import { useInspectImage } from "@/stores/use-inspect-profile-image";

import { EditProfileModal } from "./edit-profile-modal";
import { InspectImageModal } from "./inspect-image-modal";
import { ProfileNavbar } from "./profile-navbar";
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

  // const { data: user, isLoading, isError } = useUser(id);

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  // if (isError) {
  //   return <TryAgain />;
  // }

  // if (!isLoading && !isError && !user) return <UserNotFound />;

  return (
    <div className={styles.container}>
      <UserInfo user={user} />
      <ProfileNavbar pathname={pathname} id={id} />
      {isEditProfileModalOpen && <EditProfileModal user={user} />}
      {isInspectModalOpen && <InspectImageModal />}
    </div>
  );
};
