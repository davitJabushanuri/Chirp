/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";

import { useNewMessageStore } from "../../stores/use-new-message-store";

import { NewMessageHeader } from "./new-message-header";
import { SearchPeople } from "./search-people";
import styles from "./styles/new-message-modal.module.scss";

export const NewMessageModal = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const closeModal = useNewMessageStore((state) => state.closeModal);

  return (
    <div onClick={closeModal} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <NewMessageHeader />
        <SearchPeople
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {!searchQuery ? (
          <div className={styles.conversations}>recent</div>
        ) : (
          <div className={styles.searchResults}>searchResults</div>
        )}
      </div>
    </div>
  );
};
