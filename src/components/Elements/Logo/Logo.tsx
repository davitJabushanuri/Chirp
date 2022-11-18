import Link from "next/link";

import { LogoIcon } from "./assets/logo";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <Link href={`/`}>
      <div className={styles.container}>
        <LogoIcon />
      </div>
    </Link>
  );
};

export default Logo;
