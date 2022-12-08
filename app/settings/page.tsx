import { cookies } from "next/headers";

import { BackgroundPicker } from "@/components/elements/background-picker";
import { ColorPicker } from "@/components/elements/color-picker";

import styles from "./styles/settings.module.scss";

const Settings = () => {
  const nextCookies = cookies();
  const theme = nextCookies.get("theme");
  const color = nextCookies.get("color");

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Customize your view</h1>
      <h2 className={styles.subheading}>
        These settings affect all the Twitter accounts on this browser.
      </h2>
      <ColorPicker color={color?.value} />
      <BackgroundPicker theme={theme?.value} />
    </div>
  );
};

export default Settings;
