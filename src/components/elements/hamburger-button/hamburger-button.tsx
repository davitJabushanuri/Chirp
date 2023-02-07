/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { TwitterLogo } from "@/assets/twitter-logo";
import { useHamburger } from "@/stores/use-hamburger";

import styles from "./styles/hamburger-button.module.scss";

export const HamburgerButton = () => {
  const { data: session } = useSession();

  const openHamburger = useHamburger((state) => state.openHamburger);

  return (
    <>
      {session ? (
        <button onClick={() => openHamburger()} className={styles.container}>
          {session?.user?.profile_image_url ? (
            <img src={session?.user?.profile_image_url} alt="avatar" />
          ) : (
            <img src="/user_placeholder.png" alt="avatar" />
          )}
        </button>
      ) : (
        <div className={styles.logo}>
          <Link href={`/`}>
            <TwitterLogo />
          </Link>
        </div>
      )}
    </>
  );
};
