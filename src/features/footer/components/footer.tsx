import { ThreeDotsIcon } from "../assets/three-dots-icon";

import { FooterLink } from "./footer-link";
import styles from "./styles/footer.module.scss";

export const Footer = () => {
  return (
    <nav aria-label="Footer" className={styles.container}>
      <FooterLink title="Terms of Service" url="#" />
      <FooterLink title="Privacy Policy" url="#" />
      <FooterLink title="Cookie Policy" url="#" />
      <FooterLink title="Accessibility" url="#" />
      <FooterLink title="Ads info" url="#" />

      <button
        aria-expanded="false"
        aria-haspopup="menu"
        aria-label="More"
        tabIndex={0}
        className={styles.moreButton}
      >
        More <ThreeDotsIcon />
      </button>

      <span>© 2023 Chirp, Inc.</span>
    </nav>
  );
};
