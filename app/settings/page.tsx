"use client";

import { BackgroundPicker } from "@/components/Elements/background-picker";
import { ColorPicker } from "@/components/Elements/color-picker";

import styles from "./settings.module.scss";

const Settings = () => {
  return (
    <div className={styles.container}>
      <h1>Customize your view</h1>
      <h2>These settings affect all the Twitter accounts on this browser.</h2>
      <ColorPicker />
      <BackgroundPicker />
    </div>
  );
};

export default Settings;
