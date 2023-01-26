/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSession } from "next-auth/react";
import Link from "next/link";

import { useAuthModal } from "@/stores/use-auth-modal";

import styles from "./styles/user-modal.module.scss";

export const SessionOwnerModal = () => {
  const { data: session } = useSession();
  const closeUserModal = useAuthModal((state) => state.closeUserModal);

  return (
    <div onClick={() => closeUserModal()} className={styles.container}>
      <div className={styles.modalContainer}>
        {session && (
          <div className={styles.modal}>
            <button className={styles.addAccount}>
              <Link href={`/auth/signin`}>Add an existing account</Link>
            </button>
            <button>
              <Link href={`/auth/signout`}>
                Log out @{session?.user?.email.split("@")[0]}
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
