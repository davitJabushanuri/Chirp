"use client";

import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { ProfileHeader } from "@/components/layout/header";
import { useEditProfile } from "@/stores/useEditProfile";
import { useInspectImage } from "@/stores/useInspectImage";

import { useUser } from "../hooks/useUser";

import { EditProfileModal } from "./edit-profile-modal";
import { InspectImageModal } from "./inspect-image-modal";
import { ProfileNavbar } from "./profile-navbar";
import styles from "./styles/profile.module.scss";
import { UserInfo } from "./user-info";

export const Profile = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const id = pathname?.split("/")[1] || "";
  const isEditProfileModalOpen = useEditProfile(
    (state) => state.isEditProfileModalOpen,
  );
  const isInspectModalOpen = useInspectImage(
    (state) => state.isInspectModalOpen,
  );

  const { data: user, isLoading, isError } = useUser(id);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.error}>
        <TryAgain />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!isError && (
        <>
          <ProfileHeader user={user} />
          <UserInfo user={user} />
          <ProfileNavbar pathname={pathname} id={id} />
          <div>{children}</div>
          {isEditProfileModalOpen && <EditProfileModal user={user} />}
          {isInspectModalOpen && <InspectImageModal />}
        </>
      )}
    </div>
  );
};
