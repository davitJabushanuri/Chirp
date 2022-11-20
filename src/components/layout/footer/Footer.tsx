import styles from "./Footer.module.scss";
import { FooterLink } from "./link";

export const Footer = () => {
  return (
    <div className={styles.container}>
      <FooterLink title="Terms of Service" url="#" />
      <FooterLink title="Privacy Policy" url="#" />
      <FooterLink title="Cookie Policy" url="#" />
      <FooterLink title="Accessibility" url="#" />
      <FooterLink title="Ads info" url="#" />
      <FooterLink title="More..." url="#" />
      <span>© 2022 Twitter, Inc.</span>
    </div>
  );
};
