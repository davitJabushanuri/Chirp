import { useState } from "react";
import styles from "./styles/user-modal-wrapper.module.scss";
import { UserModal } from "./user-modal";

export const UserModalWrapper = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div
        onMouseEnter={() => {
          setIsUserModalOpen(true);
        }}
        onMouseLeave={() => {
          setIsUserModalOpen(false);
        }}
        className={styles.childrenWrapper}
      >
        {children}
      </div>

      {isUserModalOpen && <UserModal userId={userId} />}
    </div>
  );
};
