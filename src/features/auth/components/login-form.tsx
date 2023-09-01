"use client";
import { signIn } from "next-auth/react";

import { CloseIcon } from "@/assets/close-icon";
import { TwitterLogo } from "@/assets/twitter-logo";

import { AppleLogo } from "../assets/apple-logo";
import { GoogleLogo } from "../assets/google-logo";

import styles from "./styles/login-form.module.scss";
import { AuthButton } from "./AuthButton";

export const LoginForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <div role="group" className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={onClose}
          aria-label="Close"
          data-title="Close"
          className={styles.close}
        >
          <CloseIcon />
        </button>

        <div className={styles.logo}>
          <TwitterLogo />
        </div>

        <div className={styles.placeholder} />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2 className={styles.title}>Sign in to Chirp</h2>

          <div className={styles.authButtons}>
            <AuthButton
              onClick={() => {
                signIn("google", {
                  callbackUrl: "/home",
                });
              }}
              icon={<GoogleLogo />}
              text="Sign in with Google"
            />

            <AuthButton icon={<AppleLogo />} text="Sign in with Apple" />
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
                  autoCapitalize="sentences"
                  autoComplete="name"
                  autoCorrect="on"
                  spellCheck="true"
                  dir="auto"
                  name="text"
                  type="text"
                  id="name"
                  placeholder="Phone, email, or username"
                />
                <span aria-hidden="true">Phone, email, or username</span>
              </label>
            </div>
            <button className={styles.submit}>Next</button>
          </form>

          <button className={styles.forgotPassword}>Forgot password?</button>
        </div>
      </div>
    </div>
  );
};
