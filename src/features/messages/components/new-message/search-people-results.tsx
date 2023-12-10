import { useUsers } from "@/features/profile";

import { Contact } from "./contact";

export const SearchPeopleResults = ({
  searchQuery,
  receiverId,
  setReceiverId,
}: {
  searchQuery: string;
  receiverId: string | null;
  setReceiverId: (id: string | null) => void;
}) => {
  const { data: people, isLoading, error } = useUsers();

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <div>
      {people
        ?.filter((person) => {
          return (
            person?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person?.screen_name
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        })
        ?.map((person) => {
          return (
            <Contact
              key={person?.id}
              user={person}
              receiverId={receiverId}
              setReceiverId={setReceiverId}
            />
          );
        })}
    </div>
  );
};
