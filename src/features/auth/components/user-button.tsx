/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";

import { DotIcon } from "@/assets/dot-icon";
import Avatar from "@/assets/user_placeholder.png";
import { useAuthModal } from "@/stores/useAuthModal";

import styles from "./styles/user-button.module.scss";

export const UserButton = () => {
  const { data: session } = useSession();
  const openUserModal = useAuthModal((state) => state.openUserModal);

  return (
    <>
      <button onClick={() => openUserModal()} className={styles.container}>
        <div className={styles.avatar}>
          <img
            className={styles.image}
            src={session?.user?.image || Avatar}
            alt="avatar"
          />
        </div>
        <div className={styles.userInfo}>
          {session?.user && (
            <span className={styles.name}>
              {session?.user?.name.split(" ")[0]}
            </span>
          )}
          {session?.user && (
            <span className={styles.username}>
              @{session?.user?.email.split("@")[0]}
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
