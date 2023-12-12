import { ConfirmationModal } from "@/components/elements/modal";

import { deleteMedia } from "../api/delete-media";
import { useDeleteTweet } from "../hooks/use-delete-tweet";
import { ITweet } from "../types";

export const DeleteTweetModal = ({
  tweet,
  setIsDeleteModalOpen,
  setIsMenuOpen,
}: {
  tweet: ITweet;
  setIsDeleteModalOpen: (value: boolean) => void;
  setIsMenuOpen: (value: boolean) => void;
}) => {
  const mutation = useDeleteTweet();

  return (
    <ConfirmationModal
      heading="Delete Tweet?"
      paragraph="This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results."
      confirmButtonText="Delete"
      confirmButtonClick={() => {
        mutation.mutate({
          tweetId: tweet?.id,
        });
        setIsDeleteModalOpen(false);
        if (tweet?.media?.length)
          deleteMedia(tweet?.media?.map((m) => m.media_path));
      }}
      confirmButtonStyle="delete"
      cancelButtonText="Cancel"
      cancelButtonClick={() => {
        setIsDeleteModalOpen(false);
        setIsMenuOpen(true);
      }}
    />
  );
};
