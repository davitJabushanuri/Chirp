"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { TwitterLogo } from "@/assets/twitter-logo";
import { Avatar } from "@/components/designs/avatar";
import { useHamburger } from "@/stores/use-hamburger";

import styles from "./styles/hamburger-button.module.scss";

export const HamburgerButton = () => {
  const { data: session } = useSession();

  const openHamburger = useHamburger((state) => state.openHamburger);

  return (
    <>
      {session ? (
        <button onClick={() => openHamburger()} className={styles.container}>
          <Avatar
            userImage={session?.user?.user_profile_img}
            width={30}
            height={30}
          />
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
