import { useSession } from "next-auth/react";

import { useGetConversations } from "../../hooks/use-get-conversations";

import { Contact } from "./contact";

export const Contacts = ({
  receiverId,
  setReceiverId,
}: {
  receiverId: string | null;
  setReceiverId: (id: string | null) => void;
}) => {
  const { data: session } = useSession();

  const {
    data: conversations,
    isLoading,
    isError,
    isSuccess,
  } = useGetConversations(session?.user?.id);

  if (isLoading) return null;

  if (isError) return null;

  return (
    <div role="listbox">
      {isSuccess &&
        conversations.map((conversation) => {
          return (
            <Contact
              key={conversation?.id}
              user={
                conversation?.users?.filter(
                  (user) => user?.id !== session?.user?.id,
                )[0]
              }
              receiverId={receiverId}
              setReceiverId={setReceiverId}
            />
          );
        })}
    </div>
  );
};
