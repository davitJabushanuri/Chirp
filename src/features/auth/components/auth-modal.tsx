/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { useAuthModal } from "@/stores/useAuthModal";

import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import styles from "./styles/auth-modal.module.scss";

export const AuthModal = () => {
  const closeModal = useAuthModal((state) => state.closeModal);

  return (
    <div onClick={() => closeModal()} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <button onClick={() => closeModal()} className={styles.close}>
          <span className={styles.arrow}>
            <BackArrowIcon />
          </span>
          <span className={styles.x}>
            <CloseIcon />
          </span>
        </button>
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
};
