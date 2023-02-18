import { useState } from "react";

import { Conversation } from "./conversation";
import { SearchConversations } from "./search-conversations";
import { SearchResults } from "./search-results";
import { StartNewConversation } from "./start-new-conversation";
import styles from "./styles/conversations.module.scss";

export const Conversations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const hasMessages = true;

  const conversations = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hello",
      lastMessageTime: "1:00 PM",
      unreadMessages: 0,
    },

    {
      id: 2,
      name: "Jane Doe",
      lastMessage: "Hello",
      lastMessageTime: "1:00 PM",
      unreadMessages: 0,
    },
  ];

  return (
    <div className={styles.container}>
      {hasMessages ? (
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
              <SearchResults />
            </div>
          ) : (
            <div className={styles.conversations}>
              {conversations.map((conversation) => {
                return (
                  <div className={styles.conversation} key={conversation.id}>
                    <Conversation />
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
    </div>
  );
};
