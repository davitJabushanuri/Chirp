import Link from "next/link";

import { LogoIcon } from "../assets/logo";

import styles from "./styles/Logo.module.scss";

export const Logo = () => {
  return (
    <Link href={`/`}>
      <div className={styles.container}>
        <LogoIcon />
      </div>
    </Link>
  );
};
