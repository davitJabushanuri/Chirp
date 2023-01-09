import { DotIcon } from "@/assets/dot-icon";

import styles from "./styles/options.module.scss";

export const Options = () => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={styles.container}
    >
      <DotIcon />
    </button>
  );
};
