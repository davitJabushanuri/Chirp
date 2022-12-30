/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";

import { useHamburger } from "@/stores/useHamburger";

import styles from "./styles/hamburger-button.module.scss";

export const HamburgerButton = () => {
  const { data: session } = useSession();
  console.log(session);

  const openHamburger = useHamburger((state) => state.openHamburger);

  return (
    <button onClick={() => openHamburger()} className={styles.container}>
      {session?.user?.avatar ? (
        <img src={session?.user?.avatar} alt="avatar" />
      ) : (
        <img src="/user_placeholder.png" alt="avatar" />
      )}
    </button>
  );
};
