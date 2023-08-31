import { signOut } from "next-auth/react";

import { TwitterLogo } from "@/assets/twitter-logo";

import styles from "./styles/signout-modal.module.scss";

export const SignOutModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <TwitterLogo />
      </div>
      <h2 className={styles.title}>Log out of Twitter?</h2>
      <p className={styles.description}>
        You can always log back in at any time. If you just want to switch
        accounts, you can do that by adding an existing account.{" "}
      </p>

      <div className={styles.buttons}>
        <button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          className={styles.signout}
        >
          Log out
        </button>
        <button onClick={onClose} className={styles.cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};
