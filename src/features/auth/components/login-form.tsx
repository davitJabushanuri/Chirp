"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { AppleLogo } from "../assets/apple-logo";
import { GoogleLogo } from "../assets/google-logo";

import styles from "./styles/login-form.module.scss";

export const LoginForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign in to Twitter</h1>

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

      <form>
        <div className={styles.inputContainer}>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              placeholder="Phone, email, or username"
            />
            <span>Phone, email, or username</span>
          </label>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.submit}>Next</button>
        </div>
      </form>
      <div className={`${styles.forgotPassword} ${styles.buttonContainer}`}>
        <button>
          <Link href={`/`}>Forgot password?</Link>
        </button>
      </div>

      <div className={styles.signUp}>
        <span>Don’t have an account?</span>

        <Link href={`/`}>Sign up</Link>
      </div>
    </div>
  );
};
