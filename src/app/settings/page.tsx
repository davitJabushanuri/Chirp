import Link from "next/link";

import { VerifiedIcon } from "@/assets/verified-icon";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { ColorPicker } from "@/features/color-picker";
import { FontSizeCustomization } from "@/features/font-size-customization";
import { Header } from "@/features/header";
import { Avatar } from "@/features/profile";
import { ThemePicker } from "@/features/themes";

import styles from "./styles/settings.module.scss";

const Settings = () => {
  return (
    <div className={styles.container}>
      <Header>
        <HamburgerButton />
        <h2>Settings</h2>
      </Header>

      <div className={styles.settings}>
        <h1 className={styles.heading}>Customize your view</h1>
        <h2 className={styles.subheading}>
          These settings affect all the Twitter accounts on this browser.
        </h2>

        <article className={styles.tweet}>
          <div className={styles.avatar}>
            <Avatar userImage={`/twitter-avatar.jpg`} />
          </div>
          <div className={styles.content}>
            <div className={styles.user_details}>
              <EllipsisWrapper>
                <span className={styles.name}>Twitter</span>
              </EllipsisWrapper>

              <VerifiedIcon />

              <EllipsisWrapper>
                <span className={styles.username}>@Twitter</span>
              </EllipsisWrapper>

              <span className={styles.dot}>·</span>
              <span className={styles.time}>15m</span>
            </div>
            <p className={styles.tweet_text}>
              At the heart of Twitter are short messages called Tweets — just
              like this one — which can include photos, videos, links, text,
              hashtags, and mentions like <Link href="#">@Twitter</Link>.
            </p>
          </div>
        </article>

        <FontSizeCustomization />
        <ColorPicker />
        <ThemePicker />
      </div>
    </div>
  );
};

export default Settings;

export const metadata = {
  title: "Settings",
};
