import { BackButton } from "@/components/elements/back-button";

import styles from "./styles/connect-header.module.scss";

export const ConnectHeader = () => {
  return (
    <div className={styles.container}>
      <BackButton />
      <h1>Connect</h1>
    </div>
  );
};
