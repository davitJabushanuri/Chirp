"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { Modal } from "@/components/elements/modal";
import { TryAgain } from "@/components/elements/try-again";

import { useGetConversations } from "../hooks/use-get-conversations";
import { useNewMessageStore } from "../stores/use-new-message-store";

import { ConversationCard } from "./conversation-card";
import { NewMessageModal } from "./new-message/new-message-modal";
import { SearchConversationResults } from "./search-conversation-results";
import { SearchConversations } from "./search-conversations";
import { StartNewConversation } from "./start-new-conversation";
import styles from "./styles/conversations.module.scss";

export const Conversations = () => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const isModalOpen = useNewMessageStore((state) => state.isModalOpen);
  const closeModal = useNewMessageStore((state) => state.closeModal);

  const {
    data: conversations,
    isLoading,
    isError,
  } = useGetConversations(session?.user?.id);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <TryAgain />;

  return (
    <div className={styles.container}>
      {conversations && conversations?.length > 0 ? (
        <>
          <div>
            <SearchConversations
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
            />
          </div>
          {isSearching ? (
            <div className={styles.searchResults}>
              <SearchConversationResults searchTerm={searchTerm} />
            </div>
          ) : (
            <div className={styles.conversations}>
              {conversations?.map((conversation) => {
                return (
                  <div className={styles.conversation} key={conversation.id}>
                    <ConversationCard conversation={conversation} />
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <StartNewConversation
          title={`Welcome to your inbox!`}
          subtitle={`Drop a line, share Tweets and more with private conversations between you and others on Twitter. `}
          buttonText={`Write a message`}
        />
      )}

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={() => closeModal()} disableScroll={true}>
            <NewMessageModal />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
