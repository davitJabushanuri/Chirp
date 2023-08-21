import Link from "next/link";

import { ILinkProps } from "../types/index";

import styles from "./styles/link.module.scss";

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
