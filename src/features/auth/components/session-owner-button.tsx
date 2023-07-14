import Image from "next/image";
import { useSession } from "next-auth/react";

import { DotIcon } from "@/assets/dot-icon";
import { useAuthModal } from "@/stores/use-auth-modal";

import { SessionOwnerModal } from "./session-owner-modal";
import styles from "./styles/user-button.module.scss";

export const SessionOwnerButton = () => {
  const { data: session } = useSession();
  const openUserModal = useAuthModal((state) => state.openUserModal);
  const isUserModalOpen = useAuthModal((state) => state.isUserModalOpen);

  return (
    <>
      <button onClick={() => openUserModal()} className={styles.container}>
        <div className={styles.avatar}>
          <Image
            src={session?.user?.profile_image_url || `/user_placeholder.png`}
            alt=""
            width={200}
            height={200}
          />
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
      {isUserModalOpen && <SessionOwnerModal />}
    </>
  );
};
