"use client";
import { useSession } from "next-auth/react";

import { DotIcon } from "@/assets/dot-icon";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { Avatar, UserName, UserScreenName } from "@/features/profile";
import { useAuthModal } from "@/stores/use-auth-modal";

import { SessionOwnerModal } from "./session-owner-modal";
import styles from "./styles/session-owner-button.module.scss";

export const SessionOwnerButton = () => {
  const { data: session } = useSession();
  const openUserModal = useAuthModal((state) => state.openUserModal);
  const isUserModalOpen = useAuthModal((state) => state.isUserModalOpen);

  return (
    <>
      <button
        aria-label="Account menu"
        tabIndex={0}
        onClick={() => openUserModal()}
        className={styles.container}
        data-title="Accounts"
      >
        <div className={styles.avatar}>
          <Avatar userImage={session?.user?.profile_image_url} />
        </div>
        <div className={styles.userInfo}>
          <EllipsisWrapper>
            <UserName
              name={session?.user?.name}
              isVerified={session?.user?.verified}
            />
          </EllipsisWrapper>

          <EllipsisWrapper>
            <UserScreenName screenName={session?.user?.email?.split("@")[0]} />
          </EllipsisWrapper>
        </div>
        <div className={styles.options}>
          <DotIcon />
        </div>
      </button>
      {isUserModalOpen && <SessionOwnerModal />}
    </>
  );
};
