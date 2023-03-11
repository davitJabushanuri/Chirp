import { cookies } from "next/headers";

import { BackgroundPicker } from "@/components/elements/background-picker";
import { ColorPicker } from "@/components/elements/color-picker";

import { SettingsLayout } from "./settings-layout";
import styles from "./styles/settings.module.scss";

const Settings = () => {
  const nextCookies = cookies();
  const theme = nextCookies.get("theme");
  const color = nextCookies.get("color");

  return (
    <div>
      <SettingsLayout>
        <div className={styles.settings}>
          <h1 className={styles.heading}>Customize your view</h1>
          <h2 className={styles.subheading}>
            These settings affect all the Twitter accounts on this browser.
          </h2>
          <ColorPicker color={color?.value} />
          <BackgroundPicker theme={theme?.value} />
        </div>
      </SettingsLayout>
    </div>
  );
};

export default Settings;

export const metadata = {
  title: "Settings",
};
