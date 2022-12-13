"use client";

import { useSession, signIn, signOut } from "next-auth/react";

import styles from "./styles/landing-page.module.scss";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      {session ? (
        <div>
          <h1>hello {session.user.name}</h1>
          <button onClick={() => signOut()}>sign out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>sign in</button>
      )}
    </div>
  );
}
