import { useFollow } from "@/features/profile";

import { ConfirmationModal } from "../modal";

export const UnfollowModal = ({
  username = "user",
  user_id,
  session_owner_id,
  setIsModalOpen,
}: {
  username: string | undefined;
  user_id: string;
  session_owner_id: string;
  setIsModalOpen: (value: boolean) => void;
}) => {
  const mutation = useFollow("unfollow");

  return (
    <ConfirmationModal
      heading={`Unfollow @${username}?`}
      paragraph={`Their Tweets will no longer show up in your home timeline. You can still view their profile, unless their Tweets are protected.`}
      confirmButtonText="Unfollow"
      confirmButtonClick={() => {
        mutation.mutate({
          user_id,
          session_owner_id,
        });
        setIsModalOpen(false);
      }}
      confirmButtonStyle="unfollow"
      cancelButtonText="Cancel"
      cancelButtonClick={() => setIsModalOpen(false)}
    />
  );
};
