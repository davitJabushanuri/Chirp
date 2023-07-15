import { cookies } from "next/headers";

import { VerifiedIcon } from "@/assets/verified-icon";
import { ColorPicker } from "@/features/color-picker";
import { FontSizeCustomization } from "@/features/font-size-customization";
import { Avatar } from "@/features/profile";
import { ThemePicker } from "@/features/themes";

import styles from "./styles/settings.module.scss";

const Settings = () => {
  const nextCookies = cookies();
  const theme = nextCookies.get("theme")?.value;
  const color = nextCookies.get("color")?.value;
  const fontSize = nextCookies.get("font-size")?.value;

  return (
    <div className={styles.container}>
      {/* <SettingsHeader /> */}

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
              <div className={styles.name}>Twitter</div>
              <VerifiedIcon />
              <div className={styles.username}>@Twitter</div>
              <div className={styles.time}>15m</div>
            </div>
            <div className={styles.tweet_text}>
              At the heart of Twitter are short messages called Tweets - just
              like this one - which can include photos, videos, links, text, and
              hashtags, and mentions like {`@Twitter`}.
            </div>
          </div>
        </article>

        <FontSizeCustomization fontSize={fontSize} />
        <ColorPicker color={color} />
        <ThemePicker theme={theme} />
      </div>
    </div>
  );
};

export default Settings;

export const metadata = {
  title: "Settings",
};
