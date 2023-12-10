"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { LoadingScreen } from "@/components/elements/loading-screen";

import styles from "./styles/auth-modal-trigger.module.scss";

export const AuthModalTrigger = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <LoadingScreen />;

  if (session) return null;

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
