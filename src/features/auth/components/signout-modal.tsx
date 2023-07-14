import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { TwitterLogo } from "@/assets/twitter-logo";
import { useDisableBodyScroll } from "@/hooks";

import styles from "./styles/signout-modal.module.scss";

export const SignOutModal = () => {
  const router = useRouter();

  useDisableBodyScroll();

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.logo}>
          <TwitterLogo />
        </div>
        <h1 className={styles.title}>Log out of Twitter?</h1>
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
          <button onClick={() => router.back()} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
