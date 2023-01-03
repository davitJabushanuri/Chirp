import Link from "next/link";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { TwitterLogo } from "@/assets/twitter-logo";
import { useDisableBodyScroll } from "@/hooks";

import { IProviders } from "../types";

import { LoginForm } from "./login-form";
import styles from "./styles/auth-modal.module.scss";

export const AuthModal = ({ providers }: { providers: IProviders | null }) => {
  useDisableBodyScroll();

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.actions}>
          <button className={styles.close}>
            <Link href={`/`}>
              <span className={styles.arrow}>
                <BackArrowIcon />
              </span>
              <span className={styles.x}>
                <CloseIcon />
              </span>
            </Link>
          </button>
          <div className={styles.logo}>
            <TwitterLogo />
          </div>
          <div className={styles.placeholder}></div>
        </div>
        <LoginForm providers={providers} />
      </div>
    </div>
  );
};
