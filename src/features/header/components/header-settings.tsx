import Link from "next/link";

import { Gear } from "@/assets/gear-icon";

import styles from "./styles/header-settings.module.scss";

export const HeaderSettings = ({
  href,
  ariaLabel,
}: {
  href: string;
  ariaLabel: string;
}) => {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      data-title={ariaLabel}
      className={styles.container}
    >
      <Gear />
    </Link>
  );
};
