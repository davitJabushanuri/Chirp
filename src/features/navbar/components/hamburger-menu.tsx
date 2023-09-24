/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { CloseIcon } from "@/assets/close-icon";
import { CloseButton } from "@/components/elements/close-button";
import { Avatar, LinkToProfile, useUser } from "@/features/profile";
import { useHamburger } from "@/stores/use-hamburger";

import { AdditionIcon } from "../assets/addition-icon";
import { Bookmark } from "../assets/bookmark-icon";
import { Gear } from "../assets/gear-icon";
import { PlusIcon } from "../assets/plus-icon";
import { User } from "../assets/user-icon";

import styles from "./styles/hamburger-menu.module.scss";

export const HamburgerMenu = () => {
  const closeHamburger = useHamburger((state) => state.closeHamburger);

  const router = useRouter();
  const { data: session } = useSession();
  const { data: user } = useUser({ id: session?.user?.id });

  return (
    <motion.div
      initial={{ x: `-100%` }}
      animate={{ x: `0%` }}
      exit={{ x: `-100%` }}
      transition={{ duration: 0.2 }}
      className={styles.container}
    >
      <div className={styles.header}>
        <h2>Account info</h2>
        <CloseButton
          onClick={() => closeHamburger()}
          ariaLabel="Close"
          title="Close"
        >
          <CloseIcon />
        </CloseButton>
      </div>

      <div className={styles.profile}>
        <div className={styles.accounts}>
          <LinkToProfile
            onClick={() => {
              closeHamburger();
            }}
            userId={session?.user?.id}
            tabIndex={-1}
          >
            <Avatar userImage={session?.user?.profile_image_url} />
          </LinkToProfile>

          <Link
            aria-label="Add account"
            href={`/auth/signin`}
            onClick={() => closeHamburger()}
            className={styles.addAccount}
          >
            <AdditionIcon />
          </Link>
        </div>

        <button
          onClick={() => {
            router.push(`/${session?.user?.id}`);
            closeHamburger();
          }}
          className={styles.name}
        >
          {session?.user?.name}
        </button>
        <button
          onClick={() => {
            router.push(`/${session?.user?.id}`);
            closeHamburger();
          }}
          className={styles.username}
        >
          @{session?.user?.email?.split("@")[0]}
        </button>
        {user && (
          <div className={styles.stats}>
            <span
              onClick={() => {
                router.push(`/${session?.user?.id}/following`);
                closeHamburger();
              }}
              className={styles.following}
            >
              <strong>{user?.following?.length}</strong> Following
            </span>
            <span
              onClick={() => {
                router.push(`/${session?.user?.id}/followers`);
                closeHamburger();
              }}
              className={styles.followers}
            >
              <strong>{user?.followers?.length}</strong> Followers
            </span>
            <button className={styles.switchAccount}>
              <PlusIcon />
            </button>
          </div>
        )}
      </div>

      <nav>
        <HamburgerLink
          title="Profile"
          path={session?.user?.id}
          icon={<User />}
        />
        <HamburgerLink
          title="Bookmarks"
          path={`bookmarks`}
          icon={<Bookmark />}
        />
        <HamburgerLink title="Settings" path={`settings`} icon={<Gear />} />
      </nav>
    </motion.div>
  );
};

const HamburgerLink = ({
  title,
  path,
  icon,
}: {
  title: string;
  path: string;
  icon: React.ReactNode;
}) => {
  const closeHamburger = useHamburger((state) => state.closeHamburger);

  return (
    <Link href={`/${path}`}>
      <button onClick={() => closeHamburger()} className={styles.link}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.text}>{title}</span>
      </button>
    </Link>
  );
};
