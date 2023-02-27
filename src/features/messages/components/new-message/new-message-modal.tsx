/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSession } from "next-auth/react";
import { useState } from "react";

import { useCreateConversation } from "../../hooks/use-create-conversation";
import { useNewMessageStore } from "../../stores/use-new-message-store";

import { Contacts } from "./contacts";
import { NewMessageHeader } from "./new-message-header";
import { SearchPeople } from "./search-people";
import { SearchPeopleResults } from "./search-people-results";
import styles from "./styles/new-message-modal.module.scss";

export const NewMessageModal = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string | null>(null);

  const closeModal = useNewMessageStore((state) => state.closeModal);
  const { data: session } = useSession();
  const mutation = useCreateConversation();

  return (
    <div onClick={closeModal} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <NewMessageHeader />
        <SearchPeople
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {!searchQuery ? (
          <div className={styles.conversations}>
            <Contacts receiverId={receiverId} setReceiverId={setReceiverId} />
          </div>
        ) : (
          <div className={styles.searchResults}>
            <SearchPeopleResults
              searchQuery={searchQuery}
              receiverId={receiverId}
              setReceiverId={setReceiverId}
            />
          </div>
        )}

        <button
          onClick={() => {
            mutation.mutate({
              senderId: session?.user?.id,
              receiverId: receiverId,
            });
            closeModal();
          }}
          disabled={!receiverId}
          className={styles.createConversation}
        >
          Next
        </button>
      </div>
    </div>
  );
};
