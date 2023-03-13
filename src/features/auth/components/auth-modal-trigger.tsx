import Link from "next/link";

import styles from "./styles/auth-modal-trigger.module.scss";

export const AuthModalTrigger = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1>Don’t miss what’s happening</h1>
          <p>People on Twitter are the first to know.</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.signIn}>
            <Link href={`/auth/signin`}>Log in</Link>
          </button>
          <button className={styles.signUp}>
            <Link href={`/auth/signup`}>Sign up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
