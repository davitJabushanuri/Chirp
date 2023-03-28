"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { AppleLogo } from "../assets/apple-logo";
import { GoogleLogo } from "../assets/google-logo";

import styles from "./styles/signup-form.module.scss";

export const SignUpForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Join Twitter today</h1>

      <div className={styles.buttonContainer}>
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/home",
            })
          }
        >
          <span className={styles.icon}>
            <GoogleLogo />
          </span>
          <span className={styles.text}>Sign in with Google</span>
        </button>
      </div>

      <div className={styles.buttonContainer}>
        <button
          onClick={() =>
            signIn("apple", {
              callbackUrl: "/home",
            })
          }
        >
          <span className={styles.icon}>
            <AppleLogo />
          </span>
          <span className={styles.text}>Sign in with Apple</span>
        </button>
      </div>

      <div className={styles.divider}>
        <span className={styles.line}></span>
        <span className={styles.text}>or</span>
        <span className={styles.line}></span>
      </div>

      <div className={`${styles.buttonContainer} ${styles.createAccount}`}>
        <button className={styles.submit}>Create account</button>
      </div>

      <div className={styles.terms}>
        By signing up, you agree to the <a href="/">Terms of Service</a> and{" "}
        <a href="/">Privacy Policy</a>, including <a href="/">Cookie Use</a>.
      </div>

      <div className={styles.login}>
        Have an account already?{" "}
        <button>
          <Link href="/auth/login">Log in</Link>
        </button>
      </div>
    </div>
  );
};
