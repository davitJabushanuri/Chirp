import { cookies } from "next/headers";

import { ColorPicker } from "@/components/elements/color-picker";
import { ThemePicker } from "@/features/themes";

import styles from "./styles/settings.module.scss";

const Settings = () => {
  const nextCookies = cookies();
  const theme = nextCookies.get("theme")?.value;
  const color = nextCookies.get("color");

  return (
    <div className={styles.container}>
      {/* <SettingsHeader /> */}

      <div className={styles.settings}>
        <h1 className={styles.heading}>Customize your view</h1>
        <h2 className={styles.subheading}>
          These settings affect all the Twitter accounts on this browser.
        </h2>
        <ColorPicker color={color?.value} />
        <ThemePicker theme={theme} />
      </div>
    </div>
  );
};

export default Settings;

export const metadata = {
  title: "Settings",
};