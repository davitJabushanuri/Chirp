import Link from "next/link";

import styles from "./styles/link.module.scss";
import { ILinkProps } from "./types/index";

export const FooterLink = ({ title = "loading", url = "#" }: ILinkProps) => {
  return (
    <Link
      href={url}
      rel="noopener noreferrer nofollow"
      target="_blank"
      className={styles.container}
    >
      {title}
    </Link>
  );
};
