import { FooterLink } from "./link";
import styles from "./styles/footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <FooterLink title="Terms of Service" url="#" />
      <FooterLink title="Privacy Policy" url="#" />
      <FooterLink title="Cookie Policy" url="#" />
      <FooterLink title="Accessibility" url="#" />
      <FooterLink title="Ads info" url="#" />
      <FooterLink title="More..." url="#" />
      <span>© 2023 Chirp, Inc.</span>
    </footer>
  );
};
