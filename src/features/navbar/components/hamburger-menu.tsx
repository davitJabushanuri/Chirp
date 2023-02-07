/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { CloseIcon } from "@/assets/close-icon";
import { useUser } from "@/features/profile";
import { useHamburger } from "@/stores/use-hamburger";

import { Bookmark } from "../assets/bookmark-icon";
import { Gear } from "../assets/gear-icon";
import { PlusIcon } from "../assets/plus-icon";
import { User } from "../assets/user-icon";

import styles from "./styles/hamburger-menu.module.scss";

export const HamburgerMenu = () => {
  const isHamburgerOpen = useHamburger((state) => state.isHamburgerOpen);
  const closeHamburger = useHamburger((state) => state.closeHamburger);

  const router = useRouter();
  const { data: session } = useSession();
  const { data: user } = useUser(session?.user?.id);

  return (
    <div
      onClick={() => closeHamburger()}
      className={`${styles.container} 
    ${isHamburgerOpen ? styles.visible : styles.hidden}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.hamburger}>
        <div className={styles.actions}>
          <h1>Account info</h1>
          <button className={styles.close} onClick={() => closeHamburger()}>
            <CloseIcon />
          </button>
        </div>

        <div className={styles.profile}>
          <button className={styles.image}>
            <img src={session?.user?.profile_image_url} alt="" />
          </button>
          <p className={styles.name}>{session?.user?.name}</p>
          <span className={styles.username}>
            @{session?.user?.email?.split("@")[0]}
          </span>
          {
            user && (

           
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
           )
          }
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
      </div>
    </div>
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
      <div onClick={() => closeHamburger()} className={styles.link}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.text}>{title}</span>
      </div>
    </Link>
  );
};
