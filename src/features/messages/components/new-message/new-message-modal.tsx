import { NewMessageHeader } from "./new-message-header";
import { SearchPeople } from "./search-people";
import styles from "./styles/new-message-modal.module.scss";

export const NewMessageModal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <NewMessageHeader />
        <SearchPeople />
      </div>
    </div>
  );
};
