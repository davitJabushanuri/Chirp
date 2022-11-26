"use client";

import { BackgroundPicker } from "@/components/elements/background-picker";
import { ColorPicker } from "@/components/elements/color-picker";

import styles from "./settings.module.scss";

const Settings = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Customize your view</h1>
      <h2 className={styles.subheading}>
        These settings affect all the Twitter accounts on this browser.
      </h2>
      <ColorPicker />
      <BackgroundPicker />
    </div>
  );
};

export default Settings;
