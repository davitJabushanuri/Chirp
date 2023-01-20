/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";

import { DotIcon } from "@/assets/dot-icon";
import { useAuthModal } from "@/stores/use-auth-modal";

import styles from "./styles/user-button.module.scss";

export const UserButton = () => {
  const { data: session } = useSession();
  const openUserModal = useAuthModal((state) => state.openUserModal);

  return (
    <>
      <button onClick={() => openUserModal()} className={styles.container}>
        <div className={styles.avatar}>
          {session?.user?.profile_image_url ? (
            <img src={session?.user?.profile_image_url} alt="" />
          ) : (
            <img src="/user_placeholder.png" alt="" />
          )}
        </div>
        <div className={styles.userInfo}>
          {session?.user && (
            <span className={styles.name}>{session?.user?.name}</span>
          )}
          {session?.user && (
            <span className={styles.username}>
              @{session?.user?.email?.split("@")[0]}
            </span>
          )}
        </div>
        <div className={styles.options}>
          <DotIcon />
        </div>
      </button>
    </>
  );
};
