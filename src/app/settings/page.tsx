import { cookies } from "next/headers";

import { ColorPicker } from "@/features/color-picker";
import { FontSizeCustomization } from "@/features/font-size-customization";
import { ThemePicker } from "@/features/themes";

import styles from "./styles/settings.module.scss";

const Settings = () => {
  const nextCookies = cookies();
  const theme = nextCookies.get("theme")?.value;
  const color = nextCookies.get("color")?.value;

  return (
    <div className={styles.container}>
      {/* <SettingsHeader /> */}

      <div className={styles.settings}>
        <h1 className={styles.heading}>Customize your view</h1>
        <h2 className={styles.subheading}>
          These settings affect all the Twitter accounts on this browser.
        </h2>
        <FontSizeCustomization />
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
