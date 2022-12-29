"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { useEditProfile } from "@/stores/useEditProfile";

import { getUser } from "../api/get-user";
import { IUser } from "../types";

import { EditProfileModal } from "./edit-profile-modal";
import { ProfileNavbar } from "./profile-navbar";
import styles from "./styles/profile.module.scss";
import { UserInfo } from "./user-info";

export const Profile = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const id = pathname?.split("/")[1] || "";
  const isEditProfileModalOpen = useEditProfile(
    (state) => state.isEditProfileModalOpen,
  );

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<IUser>(["user", id], () => getUser(id));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div className={styles.container}>
      <UserInfo user={user} />
      <ProfileNavbar pathname={pathname} id={id} />
      <div>{children}</div>
      {isEditProfileModalOpen && <EditProfileModal user={user} />}
    </div>
  );
};
