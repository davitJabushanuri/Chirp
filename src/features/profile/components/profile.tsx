"use client";

import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { UserNotFound } from "@/components/elements/user-not-found";
import { ProfileHeader } from "@/features/header";
import { useEditProfile } from "@/stores/use-edit-profile";
import { useInspectImage } from "@/stores/use-inspect-profile-image";

import { useUser } from "../hooks/use-user";

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
      <>
        <ProfileHeader />
        <LoadingSpinner />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <ProfileHeader />
        <TryAgain />
      </>
    );
  }

  if (!isLoading && !isError && !user)
    return (
      <>
        <ProfileHeader />
        <UserNotFound />
      </>
    );

  return (
    <div className={styles.container}>
      <ProfileHeader user={user} />
      <UserInfo user={user} />
      <ProfileNavbar pathname={pathname} id={id} />
      <div>{children}</div>
      {isEditProfileModalOpen && <EditProfileModal user={user} />}
      {isInspectModalOpen && <InspectImageModal />}
    </div>
  );
};
