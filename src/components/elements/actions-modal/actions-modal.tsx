/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import styles from "./styles/actions-modal.module.scss";

export const ActionsModal = ({
  children,
  setIsModalOpen,
}: {
  children: React.ReactNode;
  setIsModalOpen: (isModalOpen: boolean) => void;
}) => {
  return (
    <div className={styles.container}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modal}
      >
        {children}
        <button onClick={() => setIsModalOpen(false)} className={styles.cancel}>
          Cancel
        </button>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(false);
        }}
        className={styles.background}
      ></div>
    </div>
  );
};
