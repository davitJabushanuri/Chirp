"use client";

import { BackgroundPicker } from "@/components/Elements/background-picker";

import styles from "./settings.module.scss";

const Settings = () => {
  return (
    <div className={styles.container}>
      <h1>These settings affect all the Twitter accounts on this browser.</h1>
      <BackgroundPicker />
    </div>
  );
};

export default Settings;
