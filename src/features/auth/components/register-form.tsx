import { signIn } from "next-auth/react";

import { AppleLogo } from "../assets/apple-logo";
import { GoogleLogo } from "../assets/google-logo";

import { AuthButton } from "./AuthButton";
import styles from "./styles/register-form.module.scss";

export const RegisterForm = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>New to Chirp?</h2>
      <p className={styles.description}>
        Sign up now to get your own personalized timeline!
      </p>

      <div className={styles.buttons}>
        <AuthButton
          onClick={() =>
            signIn("google", {
              callbackUrl: "/home",
            })
          }
          icon={<GoogleLogo />}
          text="Sign up with Google"
        />

        <AuthButton icon={<AppleLogo />} text="Sign up with Apple" />

        <AuthButton icon={<GoogleLogo />} text="Create account" />
      </div>

      <div className={styles.terms}>
        By signing up, you agree to the <a href="/">Terms of Service</a> and{" "}
        <a href="/">Privacy Policy</a>, including <a href="/">Cookie Use</a>.
      </div>
    </div>
  );
};
