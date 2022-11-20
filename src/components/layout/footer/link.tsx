import styles from "./link.module.scss";
import { ILinkProps } from "./types/index";

export const FooterLink = ({ title = "loading", url = "#" }: ILinkProps) => {
  return (
    <a href={url} className={styles.container}>
      {title}
    </a>
  );
};
