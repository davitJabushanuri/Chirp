import Link from "next/link";

import { LogoIcon } from "../assets/logo-icon";

import styles from "./styles/logo.module.scss";

export const Logo = () => {
  return (
    <h1 className={styles.container}>
      <Link href={`/home`} aria-label="Twitter">
        <LogoIcon />
      </Link>
    </h1>
  );
};
