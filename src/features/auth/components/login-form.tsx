"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

import { AppleLogo } from "../assets/apple-logo";
import { GoogleLogo } from "../assets/google-logo";

import styles from "./styles/login-form.module.scss";

export const LoginForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <h1 className={styles.title}>Sign in to Twitter</h1>
        <button onClick={() => signIn("google")}>
          <span className={styles.icon}>
            <GoogleLogo />
          </span>
          <span className={styles.text}>Sign in with Google</span>
        </button>
        <button onClick={() => signIn("apple")}>
          <span className={styles.icon}>
            <AppleLogo />
          </span>
          <span className={styles.text}>Sign in with Apple</span>
        </button>

        <div className={styles.divider}>
          <span className={styles.line}></span>
          <span className={styles.text}>or</span>
          <span className={styles.line}></span>
        </div>

        <div className={styles.formContainer}>
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

            <button className={styles.submit}>Sign in</button>
          </form>
        </div>
        <div className={styles.forgotPassword}>
          <button>
            <Link href={`/`}>Forgot password?</Link>
          </button>
        </div>

        <div className={styles.signUp}>
          <span>Don’t have an account?</span>

          <Link href={`/`}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};
