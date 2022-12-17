import { signIn } from "next-auth/react";

import { AppleLogo } from "../assets/apple-logo";
import { GoogleLogo } from "../assets/google-logo";

import styles from "./styles/register-form.module.scss";

export const RegisterForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New to Twitter?</h1>
      <p className={styles.description}>
        Sign up now to get your own personalized timeline!
      </p>

      <div className={styles.buttons}>
        <button onClick={() => signIn("google")} className={styles.google}>
          <span className={styles.icon}>
            <GoogleLogo />
          </span>
          <span className={styles.text}>Sign up with Google</span>
        </button>

        <button onClick={() => signIn("apple")} className={styles.apple}>
          <span className={styles.icon}>
            <AppleLogo />
          </span>
          <span className={styles.text}>Sign up with Apple</span>
        </button>

        <button className={styles.email}>
          <span className={styles.text}>Sign up with Email</span>
        </button>
      </div>

      <div className={styles.terms}>
        By signing up, you agree to the <a href="/">Terms of Service</a> and{" "}
        <a href="/">Privacy Policy</a>, including <a href="/">Cookie Use</a>.
      </div>
    </div>
  );
};
